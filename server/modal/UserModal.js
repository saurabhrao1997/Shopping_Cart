const mongoose = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")
const bcrypt =require("bcrypt")

const userSchema  = mongoose.Schema({
      id:{
        type:String
      },
    sname :{
        type:String,
        required:true,

    },
    lname :{
        type:String,
        required:true,
        
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
      type:String,
      required:true,
    },
    role:{
      type:String,
      required:true,
    },
  
    password:{
        type:String,
        required:true,
        default:"1234"
    },
    conformPassword:{
      type:String,
      required:true,
      default:"1234"
  },
  
},
{timestamps:true})

userSchema.pre("save", async function (next){
 if(this.isModified("password")){
  const salt  = await bcrypt.genSalt()
  console.log("pre",this.password,salt)
  this.password  = await bcrypt.hash(this.password,salt)
  
 }

   next()
})
   const Users = new mongoose.model("userSchema",userSchema)
module.exports = Users;

