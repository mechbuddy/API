const mongoose = require('mongoose');
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
    },
    address: {
        type: String
    }

})

const ServiceProvider = new mongoose.model('ServiceProvider', ServiceProviderSchema);
module.exports = ServiceProvider;