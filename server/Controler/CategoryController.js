const Category = require("../modal/CategoryModal")
const mongodb = require("mongodb")
const createCategory = async (req,res)=>{
   
    const {name} = req.body
    console.log("name",name,req.body)
    try{
        if(!name){
            return res.status(400).json({message:"name is required field"})
            }
        let  newCategory =  new Category( { name:name })
        let saveProduct=    await newCategory.save()
        return res.status(200).json({message:"Product successfully added in DB",
        data:saveProduct,
      
      })
    }catch(err){
     return res.status(404).json({message:err})
    }
    
 }
 const updateCategory = async (req,res)=>{
   
    const {selectedId,updatedVal} = req.body
    console.log("name",req.body)
    try{

     const updated = await  Category.findOneAndUpdate({_id:selectedId},{$set:{name:updatedVal}});
   
        return res.status(200).json({message:"Category successfully updated in DB",
        data:updated,
      
      })
    }catch(err){
     return res.status(404).json({message:err})
    }
    
 }

 const getCategory = async (req,res)=>{
   
   
    try{
        const getCategory = await Category.find({})
        if(!getCategory){
            return res.status(204).json({message:"No Category available" ,status:200})
            }
   
        return res.status(200).json({message:"category available",
        data:getCategory,
      
      })
    }catch(err){
     return res.status(404).json({message:err})
    }
    
 }




    const deleteCategory = async (req,res)=>{
   
        const {id} = req.query
        console.log("query",req.query)
        try{

           let removeCategory =   await Category.deleteOne({_id: new mongodb.ObjectId(id)});
           console.log("removeCategory",removeCategory)
        //     res.status(200).json({message:"Category successfully deleted",status:200,data:removeCategory})
        }catch(err){
         return res.status(404).json({message:err})
        }
        
        
        
        
        
        
        
        }



    module.exports = {createCategory,deleteCategory,getCategory,updateCategory}