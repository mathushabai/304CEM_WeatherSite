const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:city', async (req, res) => {
    const { city } = req.params;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;