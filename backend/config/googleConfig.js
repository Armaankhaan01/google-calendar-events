const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

const calendar = google.calendar({ version: "v3" });

module.exports = { oauth2Client, calendar };
