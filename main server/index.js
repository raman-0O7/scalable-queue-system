require('dotenv').config();

const express = require('express');
const handleAddUser = require("./addUser");
const { Queue } = require('bullmq');
const app = express();

const emailQueue = new Queue("emailQueue", {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
    }
});

app.get("/", (req,res) => {
    return res.send("Hello from server");
});

app.post("/add-user-to-course", async (req, res) => {
    await handleAddUser();
    await emailQueue.add(`${Date.now()}`, {
        to : "xyz@gmail.com",
        name : "Raman Kumar",
        msg : "Hello World"
    });
    return res.status(200).json({success: true, msg: "User added successfully"});
})

app.listen(8000, () => {
    console.log("Express Server Started at Port 8000");
})