const express = require("express");
const router = express.Router();
const planetService = require("./planet-service");

const add = (req, res, next) => {
  planetService
    .create(req.body)
    .then(() => res.json({refCode: 1, message: "success"}))
    .catch((err) => next(err));
};

// list all planets
router.get("/", (req, res) => {});

// search by name
router.get("/:name", (req, res) => {});

// search by id
router.get("/:id", (req, res) => {});

// add a planet
router.post("/", add);

// delete a planet
router.delete("/:id", (req, res) => {});

module.exports = router;
