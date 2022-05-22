const router = require('express').Router();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { validate: uuidValidate } = require('uuid');
const EventModel = require('../models/Event');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USERNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post('/file', async (req, res) => {
  if (req.files === null) {
    res.status(400).json({
      error: true,
      message: 'ERROR ENVOI MOI UN FICHIER',
      data: null,
    });
  }
  res.status(200).json({
    error: false,
    message: 'Un fichier a ete envoyer 😀',
    data: null,
  });
});
// VERIFY PARTICIPANT
router.post('/v', async (req, res) => {
  const data = req.body;
  const event = await EventModel.find({ uid: data.id });
  let event_participants = event[0].participants;
  // console.log(event_participants);
  event_participants.forEach((p) => {
    if (p.code !== data.code) {
      return res.status(400).json({
        error: true,
        message: "Vous n'êtes pas autorisé à voter sur cet évènement !",
        data: null,
      });
    }
    return res.status(200).json({
      error: false,
      message: null,
      data: event,
    });
  });
});
// CREATE AN EVENT
router.post('/upload', async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //hostname
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
  });
  if (req.files === null) {
    return res.status(400).json({
      error: true,
      message: 'Aucun évènement ajouter !',
      data: null,
    });
  }
  const { event_name, event_description, creator_id } = req.body;
  let event_uid = crypto.randomBytes(3).toString('hex');
  let part = [
    {
      email: 'khaledsannyaml@gmail.com', //sent
    },
  ];
  part.forEach(async (p) => {
    // Allocate a uuid as a code
    p.uid = crypto.randomBytes(8).toString('hex'); // UID FOR A PARTICIPANT
    p.code = crypto.randomBytes(3).toString('hex');
    p.hasVoted = false;
    //Send email
    let mailOptions = {
      from: 'OVOTE - Evenement <khaledsannyaml@gmail.com>',
      to: p.email,
      subject: `Vous participez à l'évènement - ${event_name} - ID°${event_uid}`,
      html: `Voici votre code d\'accès --- <strong>${p.code}</strong>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });
  });
  const url_img = req.files.url_img;
  url_img.name = crypto.randomBytes(10).toString('hex');
  function imageUploader() {
    return new Promise(function (resolve, reject) {
      cloudinary.uploader.upload(url_img.tempFilePath, function (result, err) {
        if (err) {
          console.log(err);
        }
        resolve(result);
      });
    });
  }
  let imageData = await imageUploader();
  try {
    // **************************************************
    let event = new EventModel({
      uid: event_uid,
      event_name: event_name,
      event_description: event_description,
      creator: creator_id,
      candidates: [
        {
          uid: '123', //generated
          firstname: 'GOJO', //sent
          lastname: 'Satoru', //sent
          numberOfVotes: 0, //default
          candidate_img: 'url.png', //sent
        },
      ],
      participants: part,
      url_img: imageData.url,
      start_date: new Date(), //sent
      end_date: new Date(), //sent
    });
    console.log(event);
    await event.save();
    res.status(200).json({
      error: false,
      message: 'Everything went smoothly!',
      data: event,
    });
  } catch (error) {
    console.log(error);
  }
});

// DELETE AN EVENT
router.delete('/:id', async (req, res) => {
  const events = await EventModel.deleteOne({ _id: req.params.id });
  res.send(events);
});

// GET SPECIFIC EVENT
router.get('/:id', async (req, res) => {
  const event = await EventModel.find({ _id: req.params.id });
  res.send(event);
});

// GET ALL EVENTS
router.get('/', async (req, res) => {
  const events = await EventModel.find();
  if (events.length === 0) {
    return res.send({ error: 'Aucun évènement disponible' });
  }
  res.send(events);
});

// GET EVENTS OF A USER
router.get('/c/:id', async (req, res) => {
  const events = await EventModel.find({ creator: req.params.id });
  if (events.length === 0) {
    return res.send({ message: 'Aucun évènement pour cet utilisateur' });
  }
  res.send(events);
});

// UPDATE AN EVENT STATUS (set onLive to false)
router.put('/:id', async (req, res) => {
  const event = await EventModel.updateOne(
    { _id: req.params.id },
    { onLive: false }
  );
  res.send(event.acknowledged);
});

module.exports = router;
