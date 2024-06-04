const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get("/:itemId", async (req, res) => {

    let { itemId } = req.params;

    try {
        const item = await Item.find({ _id:itemId });
        return res.status(200).json(item);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get("/", async (req, res) => {

    try {
        const item = await Item.find();
        return res.status(200).json(item);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post("/", async (req, res) => {

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        return res.status(200).json(newItem);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
)

module.exports = router;