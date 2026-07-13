const express = require("express");

const router = express.Router();

const loomController = require("../controllers/loom.controller");

router.post("/", loomController.createLoom);

router.get("/", loomController.getAllLooms);

module.exports = router;