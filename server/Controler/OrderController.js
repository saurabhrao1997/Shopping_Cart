const Order = require("../modal/OderModal")



const createOrder = async(req,res)=>{
    
        
    const{email,mobile,address,pinCode,tax,city,shippingCharge,itemsPrice,totalPrice,productIds} = req.body
       console.log("order",req.body)
  
  try{
  
    if(!(email && mobile && address && pinCode )){
      return res.status(400).json({message:'all data is mandetory'})
    }

    let  newOrder =  new Order( {
     
        email:email,
        mobile:mobile,
        address:address,
        city:city,
        pinCode:pinCode,
        tax:tax,
        shippingCharge:shippingCharge,
        itemsPrice:itemsPrice,
        totalPrice:totalPrice,
        productIds: productIds.map((id)=> id),
    
    })


  let saveOrder=    await newOrder.save()
  return res.status(200).json({message:"order successfully added in DB",
  data:saveOrder,

})
  
  }catch(err){
  console.log(err)
  return res.status(200).json({message:"something went wrong",error:err.message})
  }
  
}


const getAllOrder = async(req,res)=>{
    
  


try{


let allOrder = await Order.find({}).populate({path:"productIds",model:"productSchema"})


if(!allOrder){
return res.status(204).json({message:"no data found"})
}
return res.status(200).json({message:"success",data:allOrder})



}catch(err){
console.log(err)
return res.status(200).json({message:"something went wrong",error:err})
}

}

const deleteProduct = async(req,res)=>{
       console.log("query",req.query)
    try {
    //   const findOrder = await Product.findOne({_id:req.query.id})
        const deleteOrder = await Order.deleteOne({_id:req.query.id})
    //   console.log("req",req.params,req.query.id,findProduct?.image)
  
  
      res.status(200).json({message: "product successfully deleted" ,data:deleteOrder})
      
    } catch (error) {
      console.log("err",error.message)
      res.status(400).json({message:error.message})
    }
    
    
  }

module.exports = {createOrder,getAllOrder,deleteProduct}