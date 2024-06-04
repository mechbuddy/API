const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    id: {
        type: Number,
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
    size: {
        type: String,
    },
    vechileBrand: {
        type: String,
    },
    vechileModel: {
        type: String,
    },
    maximumLoad: {
        type: String,
    },
    material: {
        type: String,
    },
    salePackage: {
        type: String,
    },
    width: {
        type: String,
    },
    weight: {
        type: String,
    },
    otherFeatures: {
        type: String,
    },
    netQuantity: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;


