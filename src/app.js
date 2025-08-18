const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth)
app.get("/admin/getAllData", (rew,res,next)=>{
    res.send("request fullfilled");
})
app.use("/user", userAuth, (req,res,next)=>{
    
    console.log("handling user")
    // res.send("route handler")
    next();
    },
    (req, res)=>{
        console.log("second handler")
        res.send("2nd response")
    }
)
app.listen(3000, ()=>{
    console.log("server is listening on port 3000")
})