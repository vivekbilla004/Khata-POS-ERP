const router = require("express").Router();

const challanController = require("../controllers/dailyChallan.controller");

router.post("/", challanController.createDailyChallan);

module.exports = router;