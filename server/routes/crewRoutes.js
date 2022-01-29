const { CrewMember, Movie } = require("../database/models");
const express = require('express');
const app = express();

// get CrewMembers
app.get('/all', async (req, res, next) => {
  try {
    const crewMembers = await CrewMember.findAll();
    res.status(200).json(crewMembers);
  } catch (err) {
    next(err);
  }
});

//gets all CrewMembers of a certain Movie
app.get('/:MovieId', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.MovieId);
    if (movie) {
      const crewMembers = await movie.getCrewMembers();
      if (crewMembers && crewMembers.length > 0) {
        res.json(crewMembers);
      }
      else res.status(204).json({ message: "No CrewMembers." });
    } else res.status(404).json({ message: "No such movie." });
  } catch (err) {
    next(err);
  }
});
// post CrewMember
app.post("/", async (req, res, next) => {
  try {
    if (req.body.id && req.body.rol && req.body.nume) {
      await CrewMember.create(req.body);
      res.status(201).json({ message: "CrewMember Created!" });
    } else {
      res.status(400).json({ message: "Malformed request!" });
    }
  } catch (err) {
    next(err);
  }
});
// get CrewMember by id
app.get('/get/:CrewMemberId', async (req, res, next) => {
  try {
    const crewMember = await CrewMember.findByPk(req.params.CrewMemberId);
    if (crewMember) {
      res.status(200).json(crewMember);
    } else {
      res.status(404).json({ message: "CrewMember not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// update CrewMember by id
app.put("/:CrewMemberId", async (req, res, next) => {
  try {
    const crewMember = await CrewMember.findByPk(req.params.CrewMemberId);
    if (crewMember) {
      if (req.body.id && req.body.rol && req.body.nume) {
        await crewMember.update(req.body);
        res.status(201).json({ message: "Update on CrewMember is done." });
      } else {
        res.status(400).json({ message: "Malformed request!" });
      }
    } else {
      res.status(404).json({ message: "CrewMember not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// delete CrewMember by id
app.delete("/:CrewMemberId", async (req, res, next) => {
  try {
    const crewMember = await CrewMember.findByPk(req.params.CrewMemberId);
    if (crewMember) {
      await crewMember.destroy();
      res.status(202).json({ message: "CrewMember is gone :(" });
    } else {
      res.status(404).json({ message: "CrewMember not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// registering Movie for a CrewMember
app.post("/register/movie/:MovieId/crew/:CrewMemberId", async (req, res, next) => {
  try {
    const crewMember = await CrewMember.findByPk(req.params.CrewMemberId);
    if (!crewMember) res.status(404).json({ message: "CrewMember not found!" });
    const movie = await Movie.findByPk(req.params.MovieId);
    if (!movie) res.status(404).json({ message: "Movie not found!" });
    movie.addCrewMember(crewMember);
    await movie.save();
    res.status(200).json({ message: `Movie ${req.params.MovieId} registered for CrewMember ${req.params.CrewMemberId}` });
  } catch (err) {
    next(err);
  }
});
// registering Movie for a CrewMember AND CREATING IT
app.post("/register/movie/:MovieId/", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.MovieId);
    if (!movie) res.status(404).json({ message: "Movie not found!" });
    if (req.body.rol && req.body.nume) {
      const crewMember = await CrewMember.create(req.body);
      movie.addCrewMember(crewMember);
      await movie.save();
      res.status(200).json({ message: `Movie ${req.params.MovieId} registered for CrewMember ${req.body.id}` });
    } else {
      res.status(400).json({ message: "Malformed request!" });
    }
  } catch (err) {
    next(err);
  }
});
// unregistering Movie from a CrewMember
app.delete("/unregister/movie/:MovieId/crew/:CrewMemberId", async (req, res, next) => {
  try {
    const crewMember = await crewMember.findByPk(req.params.CrewMemberId);
    if (!crewMember) res.status(404).json({ message: "CrewMember not found!" });
    const movie = await Movie.findByPk(req.session.id);
    if (!movie) res.status(404).json({ message: "Movie not found!" });
    if (await movie.hasCrewMember(crewMember)) {
      movie.removeCrewMember(crewMember);
      await movie.save();
      res.status(200).json({ message: `Movie ${req.params.MovieId} unregistered from CrewMember ${req.params.CrewMemberId}` });
    } else res.status(404).json({ message: "Movie is not registered for such CrewMember!" });
  } catch (err) {
    next(err);
  }
});
module.exports = app;