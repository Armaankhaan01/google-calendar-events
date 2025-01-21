const { oauth2Client, calendar } = require("../config/googleConfig");

exports.getEvents = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No authorization header" });

    const accessToken = authHeader.split(" ")[1];
    oauth2Client.setCredentials({ access_token: accessToken });

    const { pageToken, maxResults = 10 } = req.query;

    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: parseInt(maxResults),
      singleEvents: true,
      orderBy: "startTime",
      pageToken,
    });

    res.json({
      events: response.data.items,
      nextPageToken: response.data.nextPageToken,
    });
  } catch (error) {
    console.error("Calendar error:", error);
    res.status(500).json({
      error: "Failed to fetch calendar events",
      details: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const accessToken = authHeader.split(" ")[1];
    oauth2Client.setCredentials({ access_token: accessToken });

    const event = {
      summary: req.body.summary,
      description: req.body.description,
      start: {
        dateTime: new Date(req.body.startDateTime).toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(req.body.endDateTime).toISOString(),
        timeZone: "UTC",
      },
      recurrence: req.body.isRecurring ? ["RRULE:FREQ=WEEKLY"] : undefined,
    };

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Calendar error:", error);
    res.status(500).json({
      error: "Failed to create event",
      details: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const accessToken = authHeader.split(" ")[1];
    oauth2Client.setCredentials({ access_token: accessToken });

    // The event ID is passed as a URL parameter
    const eventId = req.params.eventId;

    // Delete the event using the Google Calendar API
    await calendar.events.delete({
      auth: oauth2Client,
      calendarId: "primary", // "primary" is the default calendar for the user
      eventId: eventId,
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Calendar error:", error);
    res.status(500).json({
      error: "Failed to delete event",
      details: error.message,
    });
  }
};
