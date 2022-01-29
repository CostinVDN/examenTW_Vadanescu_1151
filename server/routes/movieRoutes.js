const { Movie } = require("../database/models");
const express = require('express');
const app = express();

// get Movies
app.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

// post Movie
app.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.data && req.body.categorie && req.body.titlu) {
      await Movie.create(req.body);
      res.status(201).json({ message: "Movie Created!" });
    } else {
      res.status(400).json({ message: "Missing attributes!" });
    }
  } catch (err) {
    next(err);
  }
});
// get Movie by id
app.get('/:MovieId', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.MovieId);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// update Movie by id
app.put("/:MovieId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.MovieId);
    if (movie) {
      if (req.body.data && req.body.categorie && req.body.titlu) {
        await movie.update(req.body);
        res.status(201).json({ message: "Update on Movie is done." });
      } else {
        res.status(400).json({ message: "Malformed request!" });
      }
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// delete Movie by id
app.delete("/:MovieId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.MovieId);
    if (movie) {
      const crewMembers = await movie.getCrewMembers();
      if (crewMembers && crewMembers.length > 0) {
        for (let mem of crewMembers) {
          await mem.destroy();
        }
      }
      await movie.destroy();
      res.status(202).json({ message: "Movie is gone :(" });
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  } catch (err) {
    next(err);
  }
});


module.exports = app;