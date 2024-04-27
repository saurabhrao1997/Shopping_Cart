const mongoose = require("mongoose")



 const connectMongo = ()=>{

    mongoose.connect("mongodb+srv://saurabhwarhade28:wNW7dQrnNc6b7ZZj@merndevelopmentproject.abihkuk.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("connect with mongodb successfully")
    }).catch((err)=>{
        console.log("err",err)
    })
}

module.exports = connectMongo