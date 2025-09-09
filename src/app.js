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

app.delete('/user',async (req, res)=>{
    console.log(req.body);
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("user deleted ")
    } catch(err){
        res.status(400).send("something went wrong");
    }
});

app.patch('/user', async(req,res)=> {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user =  await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument:"before",
            runValidators: true,
        })
        console.log(user)
        res.send("user udated");
    } catch(err) {
        console.log(err);
        res.status(400).send("something went wrong");
    }
})
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find();
        console.log(users);
        if(users){
            res.send(users);
        } else {
            res.send("no user found");
        }
    } catch (err){
        res.status(400).send("something went wrong")
    }
    
})
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
  