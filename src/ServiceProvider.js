const express = require('express');
const ServiceProvider = require('../models/ServiceProvider');
const router = express.Router();

router.get("/:id", async (req, res) => {

    let { id } = req.params;

    try {
        const serviceProvider = await ServiceProvider.find({ "id": id });
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }
        res.json(serviceProvider);
    } catch (error) {
        console.error('Error fetching Service Provider:', error);
        res.status(500).json({ message: 'Server error' });
    }
})
router.get("/", async (req, res) => {

    try {
        const serviceProvider = await ServiceProvider.find();
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }
        res.json(serviceProvider);
    } catch (error) {
        console.error('Error fetching Service Provider:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/', async (req, res) => {

    const { id } = req.body;

    try {
        const existingUser = await ServiceProvider.findOne({ id });

        if (existingUser) {
            return res.status(400).json({ message: "Service Provider is already registered" });
        }

        const newUser = new ServiceProvider(req.body);
        await newUser.save();
        return res.status(200).json({ newUser });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;