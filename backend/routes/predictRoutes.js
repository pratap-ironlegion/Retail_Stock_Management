const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const FESTIVAL_API_KEY = process.env.FESTIVAL_API_KEY;

router.get('/', async (req, res) => {
  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${WEATHER_API_KEY}&units=metric`
    );

    const festivalRes = await axios.get(
      `https://calendarific.com/api/v2/holidays?api_key=${FESTIVAL_API_KEY}&country=IN&year=2025`
    );

    res.json({
      weather: weatherRes.data,
      festivals: festivalRes.data.response.holidays.slice(0, 5)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching prediction data" });
  }
});

module.exports = router;
