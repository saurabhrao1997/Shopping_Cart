
const Users = require("../modal/UserModal")
const jwt  = require("jsonwebtoken")
const mongodb = require("mongodb")

const getUser = async (req,res)=>{
  // let  {sname,lname,age,email,password} = req.body
  console.log(req.params)

let allUsers =  await Users.find({_id: new mongodb.ObjectId(req.params.id)})
let newUser = await Users.findById(req.params.id)
    if(!newUser){
      return res.json({message :"no data is available"})
    }


    return res.status(200).json({message:"get user data",data:newUser})
  
   
  }



const createUser = async (req,res)=>{
 

    // let  {sname,lname,age,email,password} = req.body
    console.log(req.body)
    const {sname,lname,age,email,password,role,confirmPassword} = req.body
    try{

      if(!(sname && age && lname && email && password && role )){
        res.status(400).send({message:"all filed are required"})
      }
     let user = await Users.findOne({email}) 
   
      console.log("user",user)
     if(user){
    return  res.status(400).send({message:"User is already exist"})
     }

    let  newUser =  new Users( {
    
        sname:sname,
        lname:lname,
        age:age,
        role:role,
        email:email,
        password:password,
        confirmPassword:confirmPassword
      })



  let saveUser=    await newUser.save()

     const token = jwt.sign({id:saveUser._id,newUser},process.env.JWT_SECREATE_KEY,{
      expiresIn: "1d"
     })


    
         res.status(200).json({
          message:"code successfully done",
        data:{data:saveUser,token:token}})

   

    }catch(err){
      console.log("err",err)
      res.status(400).json({
      
        message:err,
      })

    }
  
    
     
    }


    const updateUser = async (req,res)=>{
        // let  {sname,lname,age,email,password} = req.body
      // let allUser = await Users.find({})
      //  let newUser =      await JSON.parse(req.body)
        console.log(req.body)
        
      
          await Users.updateOne({_id:new mongodb.ObjectId(req.body[0].Id)},{$set:req.body[0]}).then(()=>{
          res.status(200).json({
            message:"user successfully updated ",
          data:req.body})
                
              }).catch((err)=>{
                console.log("err",err)
                res.status(409).json({
                  message:err,
                })
              })
        
         
        }
module.exports = {createUser,updateUser,getUser}