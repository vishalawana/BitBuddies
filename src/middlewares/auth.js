
const adminAuth =  (rew,res,next)=>{
    console.log("admin auth is getting checked")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("admin is not authorized");
    }else{
        next();
    }
}
const userAuth =  (rew,res,next)=>{
    console.log("user auth is getting checked")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("user  is not authorized");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}