const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/players', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for players in the museum: a title and a path to an image.
// const playerSchema = new mongoose.Schema({
//   title: String,
//   path: String,
//   description: String,
// });
const playerSchema = new mongoose.Schema({
    name: String,
    turns: Number,
    duration: Number,
    date: String,
})

// Create a model for players in the museum.
// const player = mongoose.model('player', playerSchema);
const Player = mongoose.model('Player', playerSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new player in the museum: takes a title and a path to an image.
app.post('/api/players', async (req, res) => {
  const player = new Player({
    // title: req.body.title,
    // path: req.body.path,
    // description: req.body.description
    name: req.body.name,
    turns: req.body.turns,
    duration: req.body.duration,
    date: req.body.date,
  });
  try {
    await player.save();
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the players in the museum.
app.get('/api/players', async (req, res) => {
  try {
    let players = await player.find();
    res.send(players);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/players/:id', async (req, res) => {
  try {
    let players = await player.deleteOne({ _id: req.params.id });
    res.send(players);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/players/:id', async (req, res) => {
  try {
    let player = await player.findOne({ _id: req.params.id });
    player.title = req.body.title;
    player.save();
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));