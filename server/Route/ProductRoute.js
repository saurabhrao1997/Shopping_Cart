const express = require("express")

const {createproduct,getAllProduct,updateProduct,deleteProduct,getSingleProduct,addReview} =require("../Controler/ProductContrller")
const router = express.Router()
// const {LoginController} = require("../Controler/loginController")
const Product = require("../modal/ProductModal")
const path =require("path")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log("multer inside",file)
        cb(null,`./upload/productImage`)
    },
    filename:(req,file,cb)=>{
        console.log("multer inside",req.body.image)
        cb(null,`${file?.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
  
  const upload = multer({ storage: storage })






router.post( "/createproduct",upload.array("productImage",10),createproduct)
router.route("/getproduct").get(getAllProduct)
router.route("/updateproduct").put(updateProduct)
router.route("/deleteproduct").delete(deleteProduct)
router.route("/singleproduct").get(getSingleProduct)
router.route("/review").post(addReview)

module.exports = router