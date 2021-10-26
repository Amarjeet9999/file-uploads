const express = require('express');
const router = express.Router();
const User = require("../models/users.model");
const fs = require('fs');

const upload = require('../middlewares/file-upload');

router.post("/", upload.single("userImage"), async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            image_urls: req.file.path,
        })

        return res.status(201).json({ data: user });
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
});


router.patch("/:id", upload.single("userImage"), async (req, res) => {
    try {
        const temp = await User.findById(req.params.id);
        await fs.unlinkSync(temp.image_urls);

        const user = await User.findByIdAndUpdate(req.params.id, { image_urls: req.file.path }, {
            new: true,
        }).lean();
        return res.status(201).json({ data: user });
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})


router.get("/", async (req, res) => {
    try {
        const users = await User.find({}).lean().exec();
        return res.status(201).json({ data: users });
    } catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });

    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        await fs.unlinkSync(user.image_urls);
        return res.status(201).json({ user: user });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

module.exports = router;