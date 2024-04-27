const Product =require("../modal/ProductModal")
const fs = require("fs")
const path = require('path');
const uploadOnCloudinary = require("../utils/Cludnary")


const mongodb = require("mongodb");
const { default: mongoose } = require("mongoose");
const createproduct = async(req,res)=>{
    
        
        const{productName,Quantity,Price,Type,image,Brand,Description} = req.body
           console.log("Product",req.files[0].path)
      
      try{
      
        if(!(productName && Quantity && Price && Type )){
          return res.status(400).json({message:'all data is mandetory'})
        }

  //  let getPromiss =     req.files && req.files.forEach(file =>  uploadOnCloudinary(file.path)
  //     );

        let  newProduct =  new Product( {
         
          productName:productName,
          Brand:Brand,
          Description:Description,
          Quantity:Quantity,
          Price:Price,
          Type: Type,
          image:req.files.map((file)=> file.filename)
        })


      let saveProduct=    await newProduct.save()
      return res.status(200).json({message:"Product successfully added in DB",
      data:saveProduct,
    
    })
      
      }catch(err){
      console.log(err)
      return res.status(200).json({message:"something went wrong",error:err.message})
      }
      
}

const getAllProduct = async(req,res)=>{
    
        console.log(" query",req.query)

  
  try{
    if(req.query.search){
      let allProduct = await Product.find({Type:req.query.search})
      return res.status(200).json({message:"success",data:allProduct})
    }

    let allProduct = await Product.find({}).populate({path:"Type",model:"Category"})
  

  if(!allProduct){
    return res.status(204).json({message:"no data found"})
  }
  return res.status(200).json({message:"success",data:allProduct})


 
  }catch(err){
  console.log(err)
  return res.status(200).json({message:"something went wrong",error:err})
  }
  
}
const getSingleProduct = async(req,res)=>{
    
        
console.log("req",req.query)
  
  try{


  let singleProduct = await Product.find({_id:req.query.id }).populate({path:"Type",model:"Category"})
  console.log("req",singleProduct)
  if(!singleProduct){
    return res.status(204).json({message:"no data found"})
  }


  return res.status(200).json({message:"success",data:singleProduct})
 
  }catch(err){
  console.log(err)
  return res.status(200).json({message:"something went wrong",error:err})
  }
  
}


const updateProduct = async(req,res)=>{

  try {
    const getProduct = await Product.updateOne({_id:req.body._id},{$set:req.body})
    console.log("req",req.body,getProduct)
    res.status(200).json({message: "product successfully updated"})
    
  } catch (error) {
    console.log("err",err)
    res.status(400).json({message:err})
  }
  
  
}

const deleteProduct = async(req,res)=>{
  
  try {
    const findProduct = await Product.findOne({_id:req.query.id})
      const deleteProduct = await Product.deleteOne({_id:req.query.id})
    console.log("req",req.params,req.query.id,findProduct?.image)


     const parentDir = path.resolve(__dirname, '..')

    findProduct?.image && findProduct.image.map((image)=>{
      const newPath = path.join(parentDir,`upload/productImage/${image}`)
      fs.unlink(`${newPath}`,(err)=>{
        console.log(err)
    })
    })
    res.status(200).json({message: "product successfully deleted" ,data:deleteProduct})
    
  } catch (error) {
    console.log("err",err)
    res.status(400).json({message:err})
  }
  
  
}

const addReview = async(req,res)=>{
   const {rating,comment,userDetails,productId} = req.body

   try{

    // const findProduct = await Product.find({_id: new mongodb.ObjectId(userDetails._id)})
    let singleProduct = await Product.find({_id:productId })
    console.log("findProduct",req.body,singleProduct)
    if(!rating && !comment ){
      return res.status(400).json({message:"rating and comment are required fields"})
     }
  
     const newReview = {
      name:`${userDetails.sname} ${userDetails.lname}`,
      rating:rating,
      comment:comment,
      user:userDetails._id
  
  
     }
     console.log("review",newReview,userDetails)
     singleProduct[0].Review.push(newReview)
     singleProduct[0].numReview = singleProduct[0].Review.length
      singleProduct[0].Rating = singleProduct[0].Review.reduce((acc,item)=> +item.rating + acc ,0)/singleProduct[0].Review.length
     console.log("rating",singleProduct[0].Review.reduce((acc,item)=> +item.rating + acc ,0),singleProduct[0].Review.length)
      await singleProduct[0].save()
      return res.status(200).json({message:"review added"})


   }catch(err){
    res.status(400).json({message:err.message})
   }
}


module.exports = {createproduct,getAllProduct,updateProduct,deleteProduct,getSingleProduct,addReview}