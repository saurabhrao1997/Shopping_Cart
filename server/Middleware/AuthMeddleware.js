
const { response } = require("express");
const jwt =require("jsonwebtoken")

const requireSignIn = async(req,res,next) =>{
   try{
    const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECREATE_KEY,
    );
    next()

   }catch(err){
    return res.status(403).redirect("/").json({message:"reqired sign"})

   }
}

module.exports ={requireSignIn}