const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const favoriteSchema = new mongoose.Schema({
    city: { type: String, required: true }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

router.get('/', async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

router.post('/', async (req, res) => {
    const { city } = req.body;

    const newFavorite = new Favorite({ city });
    try {
        const favorite = await newFavorite.save();
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

router.delete('/:city', async (req, res) => {
    const { city } = req.params;

    try {
        await Favorite.deleteOne({ city });
        res.status(200).json({ message: 'Favorite removed' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

module.exports = router;