// Base imports
require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const connectDB = require('./config/db');
let port = process.env.PORT || 5000;
//DB Connection
connectDB();
// Init Express
const app = express();

// Middlewares
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('ok');
});
app.use('/api/user', require('./api/auth'));
// EVENT
app.use('/api/events', require('./api/events'));

app.use('/api/posts', require('./api/posts'));

// Launch server.js listener
app.listen(port, () => console.log(`Server runs on: http://localhost:8080`));
