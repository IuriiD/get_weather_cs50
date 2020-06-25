const express = require('express');
const get_weather = require('../handlers/');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).send('OK');
})

router.get('/forecast_for_city', async (req, res) => {
    if (!req.query.location) {
        return res.status(400).json({status: 400, res: "Location missing"});
    }

    const weather = await get_weather(req.query.location);    
    res.status(weather.status).send(weather.data);
    
})

module.exports = router;