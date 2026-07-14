const express = require("express");

const router = express.Router();

const loomController = require("../controllers/loom.controller");


router.post("/", loomController.createLoom);

router.get("/", loomController.getAllLooms);

router.get("/idle", loomController.getIdleLooms);

module.exports = router;