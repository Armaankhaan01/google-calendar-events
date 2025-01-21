const express = require("express");
const {
  getAuthUrl,
  handleCallback,
  refreshToken,
} = require("../controllers/authController");

const router = express.Router();

router.get("/google/url", getAuthUrl);
router.post("/google/callback", handleCallback);
router.post("/refresh-token", refreshToken);

module.exports = router;
