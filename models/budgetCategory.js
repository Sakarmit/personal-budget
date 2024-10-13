const mongoose = require("mongoose");

const colorRegex = /^#[0-9a-fA-F]{6}$/;

const budgetCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true,
            "Missing title field"]
    },
    value: {
        type: Number,
        required: [true,
            "Missing value field"]
    },
    color: {
        type: String,
        trim: true,
        validate: [(color) => colorRegex.test(color), 
            "Color must be in 6 digit hexadecimal format '#FFFFFF'"],
        required: [true,
            "Missing color field"]
    }
}, {collection: 'categories'});

module.exports = mongoose.model('budgetCategory', budgetCategorySchema);