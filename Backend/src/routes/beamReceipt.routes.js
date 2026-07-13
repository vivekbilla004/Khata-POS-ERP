const router = require("express").Router();

const beamReceiptController = require("../controllers/beamReceipt.controller");

router.post("/", beamReceiptController.createBeamReceipt);
router.get("/", beamReceiptController.getAllReceipts);

module.exports = router;