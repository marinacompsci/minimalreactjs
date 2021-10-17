const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors')
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const app = express();
app.use(cors());
const port = 3000;

async function getMovie(res, movieTitle) {
  try {
    await client.connect();

    const database = client.db('test');
    const moviesCollection = database.collection('movies');

    const movie = await moviesCollection.findOne({ title: movieTitle });
    res.json(movie);

  } finally {
    await client.close();
  }

}

async function getMovies(res) {
  try {
    let movies = [];
    await client.connect();

    const database = client.db('test');
    const moviesCollection = database.collection('movies');

    const projection = { _id : 0 };
    const cursor = await moviesCollection.find().project(projection);

    if ((await cursor.count()) === 0) {
      console.log("No movies found!");
    }

    await cursor.forEach(movie => movies.push(movie));

    res.json(movies);

  } finally {
    await client.close();
  }

}

////////////// ROUTES //////////////////////////////////////////////////////v

app.get('/', (req, res) => {
  console.log("Got MOVIES Request");
  getMovies(res);
  console.log("SENT MOVIES DATA");
})

app.get('/movies/:title', (req, res) => {
  console.log("Got MOVIE Request");
  getMovie(res, req.params.title);
  console.log("SENT MOVIE DATA");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
