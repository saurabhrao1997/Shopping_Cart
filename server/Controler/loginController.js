const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const Users = require("../modal/UserModal")







const LoginController = async(req,res,next)=>{


const {email, password} = req.body
 const newUser = await Users.findOne({email})

 if(!newUser){
  return res.status(400).send({message:"email or password are not valid"})
 }
 if( ! await bcrypt.compare(password,newUser.password)){



  return  res.status(400).send({message:"email or password are not valid"})
  

 }

 if(await bcrypt.compare(password,newUser.password)){
const token  =  jwt.sign({
  id:newUser._id,
  newUser,
},
"sjgsglkwrklioobwbrormom",
{
  expiresIn:"1d"
}

)

const option = {
  expires: new Date(Date.now()+ 3*24*60*60*1000),
  httponly:true
}
    


  return res.status(200).cookie("token",token,option).json({data:{data :newUser,token:token}, message:"successfully done"})
 }





   
}

module.exports = {LoginController}