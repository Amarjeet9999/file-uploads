const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    image_urls: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true
})


module.exports = mongoose.model("user", userSchema);