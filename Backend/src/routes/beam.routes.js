const router = require("express").Router();

const beamController = require("../controllers/beam.controller");

router.post("/", beamController.createBeam);
router.get("/", beamController.getAllBeams);
router.get("/available", beamController.getAvailableBeams);

module.exports = router;