const mongoose = require('mongoose');
const schema = mongoose.Schema;

const InventorySchema = new schema({
    item: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Inventory', InventorySchema)