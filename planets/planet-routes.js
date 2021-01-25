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

// list all planets
router.get("/", getAll);

// search by name
router.get("/:name", (req, res) => {});

// search by id
router.get("/:id", (req, res) => {});

// add a planet
router.post("/", add);

// delete a planet by name
router.delete("/delete", deletePlanet);

module.exports = router;
