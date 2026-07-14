const router = require("express").Router();

const allocationController = require("../controllers/allocation.controller");

router.post("/", allocationController.allocateBeam);
router.get("/", allocationController.getRunningAllocations); 
router.get("/", allocationController.getRunningAllocations);

module.exports = router;
