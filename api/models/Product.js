const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    status: Number,
    contact: String,
    whatsapp: String,
    image: String,
    userId: mongoose.ObjectId,
    username: String,
    categoryId: mongoose.ObjectId
}, {
    timestamps: true,
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;