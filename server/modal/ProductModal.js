const mongoose = require("mongoose");
// const { default: isEmail } = require("validator/lib/isEmail")
// const bcrypt =require("bcrypt")



const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    rating: { type: String },
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Brand: {
      type: String,
    },
    Quantity: {
      type: String,
      required: true,
    },
    Price: {
      type: String,
      required: true,
      default: 0,
    },
    Type: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category"
      // required:true,
    },
    image: {
      type: Array,
    },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    Review: [reviewSchema],
    Rating: { type: Number, default: 0 },
    numReview: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = new mongoose.model("productSchema", productSchema);
module.exports = Product;
