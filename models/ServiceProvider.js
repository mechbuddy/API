const mongoose = require('mongoose');


const PriceSchema = new mongoose.Schema({
    basicPrice: {
        type: String,
        required: true,
    },
    premiumPrice: {
        type: String,
        required: true,
    },
    proPrice: {
        type: String,
        required: true,
    }
}, { _id: false }); // Disables the automatic creation of _id for nested subdocuments

const FuelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prices: {
        type: PriceSchema,
        required: true
    }
}, { _id: false })

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fuel: {
        type: [FuelSchema],
        required: true
    }
}, { _id: false });

const ManufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brands: {
        type: [BrandSchema],
        required: true
    }
}, { _id: false });

const ServiceProviderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    manufacturers: {
        type: [ManufacturerSchema],
        required: true
    },
    address: {
        type: String
    }
});

const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);
module.exports = ServiceProvider;

