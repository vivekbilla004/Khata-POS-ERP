const router = require("express").Router();

const allocationController = require("../controllers/allocation.controller");

router.post("/", allocationController.allocateBeam);

module.exports = router;
