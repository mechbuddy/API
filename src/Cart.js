const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get("/:token", async (req, res) => {

    let { token } = req.params;

    try {
        const cart = await Cart.find({ token });
        return res.status(200).json(cart);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.put("/:token/:itemId", async (req, res) => {
    let { token, itemId } = req.params;

    try {
        let cart = await Cart.findOne({ token });

        if (cart) {
            const updatedItems = cart.items.filter(item => item.id !== (itemId));

            if (updatedItems.length === cart.items.length) {
                return res.status(404).json({ message: "Item not found in the cart" });
            }

            cart.items = updatedItems;
            await cart.save();

            return res.status(200).json({ message: "Item removed successfully" });
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/:token', async (req, res) => {
    const { token } = req.params;
    const { items } = req.body;
    console.log(items)
    try {
        let cart = await Cart.findOne({ token });

        if (cart) {
            cart.items = [...cart.items, items];
        } else {
            cart = new Cart({ token, items: [items] });
        }

        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;