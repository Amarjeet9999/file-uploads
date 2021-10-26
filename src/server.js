require("dotenv").config();
const PORT = process.env.PORT;
const express = require('express');
const connect = require("./config/db");

// Controllers
const userController = require('./controllers/users.controller');
const galleryController = require("./controllers/gallary.controller");


const app = express();
app.use(express.json());


// Routes
app.use('/users', userController);
app.use('/gallery', galleryController);

// app.use("/", async (req, res) => {
//     res.send("Route Not found")
// })


app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on Port ${PORT}`);
})