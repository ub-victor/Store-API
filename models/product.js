const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt:{
        type: Date,
        default: Data.now()
    },
    company:{
        type: String,
        enum: ["Ikea", "Liddy", "Caressa", "marcos"]
    }
}) 