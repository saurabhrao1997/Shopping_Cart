const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:32,
        unique:true
    }
})

const Category = mongoose.model("Category",CategorySchema)
module.exports = Category;