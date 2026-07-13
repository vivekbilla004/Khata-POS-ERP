const router = require("express").Router();

const controller = require("../controllers/party.controller");

router.post("/", controller.createParty);

router.get("/", controller.getAllParties);

module.exports = router;