const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    desc1: {
        type: String,
        required: true,
    },
    desc2: {
        type: String,
    },
    desc3: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
});

const CartSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    items: [ItemSchema]
});

const Cart = new mongoose.model('Cart', CartSchema);
module.exports = Cart;