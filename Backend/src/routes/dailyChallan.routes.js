const router = require("express").Router();

const challanController = require("../controllers/dailyChallan.controller");

router.post("/", challanController.createDailyChallan);
router.get("/", challanController.getAllChallans);
router.get("/:id", challanController.getChallanById);

module.exports = router;
