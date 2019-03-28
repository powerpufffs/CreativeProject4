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
mongoose.connect('mongodb://localhost:27017/games', {
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

// Create a scheme for games in the museum: a title and a path to an image.
const gamesSchema = new mongoose.Schema({
    name: String,
    turns: Number,
    duration: Number,
    date: String,
})

// Create a model for games in the museum.
// const Game = mongoose.model('Game', gameschema);
const Game = mongoose.model('Game', gamesSchema);

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

// Create a new Game in the museum: takes a title and a path to an image.
app.post('/api/games', async (req, res) => {
  const game = new Game({
    // title: req.body.title,
    // path: req.body.path,
    // description: req.body.description
    name: req.body.name,
    turns: req.body.turns,
    duration: req.body.duration,
    date: req.body.date,
  });
  try {
    await game.save();
    res.send(game);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the games in the museum.
app.get('/api/games', async (req, res) => {
  try {
    let games = await Game.find();
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/games/:id', async (req, res) => {
  try {
    let games = await Game.deleteOne({ _id: req.params.id });
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//TODO: Figure out whether we need a PUT
app.put('/api/games/:id', async (req, res) => {
  try {
    let game = await Game.findOne({ _id: req.params.id });
    //
    //
    //
    game.save();
    res.send(game);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));