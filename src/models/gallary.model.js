const mongoose = require('mongoose');


const gallerySchema = new mongoose.Schema({
    pictures: [{ type: String, required: true }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});



module.exports = mongoose.model('gallery', gallerySchema);