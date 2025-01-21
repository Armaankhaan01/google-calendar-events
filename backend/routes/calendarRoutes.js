const express = require("express");
const { getEvents, createEvent, deleteEvent } = require("../controllers/calendarController");

const router = express.Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.delete("/events/:eventId" , deleteEvent)
module.exports = router;
