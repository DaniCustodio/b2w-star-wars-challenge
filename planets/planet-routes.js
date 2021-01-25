const express = require("express");
const router = express.Router();
const planetService = require("./planet-service");

const add = (req, res, next) => {
  planetService
    .create(req.body)
    .then(() => res.json({ refCode: 1, message: "success" }))
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  planetService
    .getPlanets()
    .then((planets) =>
      res.json({ refCode: 1, message: "success", data: planets || [] })
    )
    .catch((err) => next(err));
};

const deletePlanet = (req, res, next) => {
  planetService
    .removePlanet(req.body)
    .then(() => res.json({ refCode: 1, message: "success" }))
    .catch((err) => next(err));
};

const searchByName = (req, res, next) => {
  planetService
    .searchByName(req.params.name)
    .then((planet) =>
      res.json({ refCode: 1, message: "success", data: planet })
    )
    .catch((err) => next(err));
};

const searchById = (req, res, next) => {
  planetService
    .searchById(req.params.id)
    .then((planet) =>
      res.json({ refCode: 1, message: "success", data: planet })
    )
    .catch((err) => next(err));
};

// list all planets
router.get("/", getAll);

// search by name
router.get("/name/:name", searchByName);

// search by id
router.get("/:id", searchById);

// add a planet
router.post("/", add);

// delete a planet by name
router.delete("/delete", deletePlanet);

module.exports = router;
