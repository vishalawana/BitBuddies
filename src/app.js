const express = require("express");

console.log(express);
const app = express();

app.use((req, res) => {
    res.send("helloworld!")
})

app.listen(3000, ()=>{
    console.log("server is listening on port 3000")
})