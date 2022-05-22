const router = require('express').Router();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { validate: uuidValidate } = require('uuid');
const EventModel = require('../models/Event');

// VERIFY PARTICIPANT
router.post('/v', async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Vous avez acces",
    data: {
      uid: "34710c",
      event_name: "Miss International",
      event_description: "Miss International pour valoriser la beauté de la femme dans le monde !",
      url_img: "https://p0.piqsels.com/preview/946/334/358/person-face-human-head.jpg",
      creator: "c123456",
      candidates: [
        {
            uid: "123",
            firstname: "GOJO",
            lastname: "Sanya",
            numberOfVotes: 0,
            candidate_img: "https://p0.piqsels.com/preview/486/138/440/adult-attractive-beautiful-beauty.jpg"
        },
        {
            uid: "423",
            firstname: "MANSI",
            lastname: "Tarika",
            numberOfVotes: 0,
            candidate_img: "https://p2.piqsels.com/preview/885/661/281/attractive-beautiful-beauty-elegant.jpg"
        }
    ],
    participants: [
      {
          email: "erickadje96@gmail.com",
          uid: "04b94dfcf76829db",
          code: "841d6d",
          hasVoted: false
      }
  ],
  onLive: true,
  start_date: new Date.now(),
  end_date: new Date.now(),
  created_at: new Date.now()
    }
  })
});
// CREATE AN EVENT
router.post('/upload', async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Evenement créer",
    data: null
  })
});

// DELETE AN EVENT
router.delete('/:id', async (req, res) => {
 
});

// GET SPECIFIC EVENT
router.get('/:id', async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Vous avez acces",
    data: {
      uid: "34710c",
      event_name: "Miss International",
      event_description: "Miss International pour valoriser la beauté de la femme dans le monde !",
      url_img: "https://p0.piqsels.com/preview/946/334/358/person-face-human-head.jpg",
      creator: "c123456",
      candidates: [
        {
            uid: "123",
            firstname: "GOJO",
            lastname: "Sanya",
            numberOfVotes: 0,
            candidate_img: "https://p0.piqsels.com/preview/486/138/440/adult-attractive-beautiful-beauty.jpg"
        },
        {
            uid: "423",
            firstname: "MANSI",
            lastname: "Tarika",
            numberOfVotes: 0,
            candidate_img: "https://p2.piqsels.com/preview/885/661/281/attractive-beautiful-beauty-elegant.jpg"
        }
    ],
    participants: [
      {
          email: "erickadje96@gmail.com",
          uid: "04b94dfcf76829db",
          code: "841d6d",
          hasVoted: false
      }
  ],
  onLive: true,
  start_date: new Date.now(),
  end_date: new Date.now(),
  created_at: new Date.now()
    }
  })
});

// GET ALL EVENTS
router.get('/', async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Vous avez acces",
    data: {
      uid: "34710c",
      event_name: "Miss International",
      event_description: "Miss International pour valoriser la beauté de la femme dans le monde !",
      url_img: "https://p0.piqsels.com/preview/946/334/358/person-face-human-head.jpg",
      creator: "c123456",
      candidates: [
        {
            uid: "123",
            firstname: "GOJO",
            lastname: "Sanya",
            numberOfVotes: 0,
            candidate_img: "https://p0.piqsels.com/preview/486/138/440/adult-attractive-beautiful-beauty.jpg"
        },
        {
            uid: "423",
            firstname: "MANSI",
            lastname: "Tarika",
            numberOfVotes: 0,
            candidate_img: "https://p2.piqsels.com/preview/885/661/281/attractive-beautiful-beauty-elegant.jpg"
        }
    ],
    participants: [
      {
          email: "erickadje96@gmail.com",
          uid: "04b94dfcf76829db",
          code: "841d6d",
          hasVoted: false
      }
  ],
  onLive: true,
  start_date: new Date.now(),
  end_date: new Date.now(),
  created_at: new Date.now()
    }
  })
});

// GET EVENTS OF A USER
router.get('/c/:id', async (req, res) => {
  res.status(200).json({
    error: false,
    message: "Vous avez acces",
    data: {
      uid: "34710c",
      event_name: "Miss International",
      event_description: "Miss International pour valoriser la beauté de la femme dans le monde !",
      url_img: "https://p0.piqsels.com/preview/946/334/358/person-face-human-head.jpg",
      creator: "c123456",
      candidates: [
        {
            uid: "123",
            firstname: "GOJO",
            lastname: "Sanya",
            numberOfVotes: 0,
            candidate_img: "https://p0.piqsels.com/preview/486/138/440/adult-attractive-beautiful-beauty.jpg"
        },
        {
            uid: "423",
            firstname: "MANSI",
            lastname: "Tarika",
            numberOfVotes: 0,
            candidate_img: "https://p2.piqsels.com/preview/885/661/281/attractive-beautiful-beauty-elegant.jpg"
        }
    ],
    participants: [
      {
          email: "erickadje96@gmail.com",
          uid: "04b94dfcf76829db",
          code: "841d6d",
          hasVoted: false
      }
  ],
  onLive: true,
  start_date: new Date.now(),
  end_date: new Date.now(),
  created_at: new Date.now()
    }
  })
});

// UPDATE AN EVENT STATUS (set onLive to false)
router.put('/:id', async (req, res) => {

});

module.exports = router;
