const { HostAddress, Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,

    },
    shippingCharge:{
        type:Number
    },
    itemsPrice:{
        type:String
    },
    totalPrice:{
        type:String
    },
    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productSchema"
    }]



},{Timestamp:true})

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;