const express = require("express")

const router = express.Router()
// const {LoginController} = require("../Controler/loginController")
const Users = require("../modal/UserModal")

router.route("/getalluser").get(async(req,res)=>{
                  console.log("user",req.query)
    await Users.find({}).then((ress)=>{
      console.log("user",ress)
      if(res.length == 0){
       return  res.status(204).json({message:"no data found"})
      }
      return res.status(200).json({message:"data got successfully",data:ress})
      

    }).catch((err)=>{
      console.log("err",err)
    })

//  res.status(200).json({message:"these new user",data:newUser})
})




module.exports = router