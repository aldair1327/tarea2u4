const mongoose = require ('mongoose');

let productSchema = new mongoose.Schema({
    name:{
        type: String
    },
    
    description:{
        type: String
    },

    price:{
        type: Number
    },

    image:{
        type: String
    }
})

const productModel = mongoose.model('Products', productSchema, 'products');
module.exports = productModel;
