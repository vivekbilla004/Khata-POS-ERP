const router = require("express").Router();
const upload = require("../middleware/multer");
const beamReceiptController = require("../controllers/beamReceipt.controller");

router.post(
  "/",
  upload.array("images", 10),
  beamReceiptController.createBeamReceipt
);
router.get("/", beamReceiptController.getAllReceipts);
router.get("/:id", beamReceiptController.getReceiptById);

module.exports = router;