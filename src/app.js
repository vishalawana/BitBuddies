const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.post("/signup", async (req, res) => {
   
    try{
        const { firstName, lastName, emailId, password, age, gender } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            age,
            emailId,
            password,
            gender
        })
        await newUser.save();

        res.status(201).json({
             message: "Signup successful", 
             data: req.body 
        });

    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Error creating user", error});
    }
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("App is running on port 3000");
        });
    })
    .catch((err) => {
        console.error(`Connection error: ${err}`);
    });
