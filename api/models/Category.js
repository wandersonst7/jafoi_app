const mongoose = require("mongoose")
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
    userId: mongoose.ObjectId,
}, {
    timestamps: true,
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;