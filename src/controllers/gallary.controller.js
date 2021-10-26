const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallary.model')
const fs = require('fs');

const upload = require('../middlewares/file-upload');




// Posting the data With Single Images
router.post("/", upload.single("images"), async (req, res) => {
    try {
        const gallery = await Gallery.create({
            pictures: req.file.path,
            userId: req.body.userId
        });
        return res.status(201).json({ data: gallery });
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

// Posting the data With Multiple Images
router.post("/", upload.single("images"), async (req, res) => {
    const filePaths = req.files.map(file => file.path);
    try {
        const gallery = await Gallery.create({
            pictures: filePaths,
            userId: req.body.userId
        });
        return res.status(201).json({ data: gallery });
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

// Getting the data

router.get("/", async (req, res) => {
    try {
        const gallery = await Gallery.find({}).lean().exec();
        return res.status(201).json({ data: gallery });
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id);
        
        await gallery.pictures.map((el) => fs.unlinkSync(el));
        return res.status(201).json({ user: gallery });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

module.exports = router;