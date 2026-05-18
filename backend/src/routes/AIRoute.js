const express = require("express");
const router = express.Router();
const promptController = require("../controllers/promptController");
const { protect } = require("../middlewares/authMW");
// STREAM AI
router.post("/stream", protect, promptController.streamLesson);

module.exports = router;