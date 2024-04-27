const express = require("express")
const multer  = require('multer')
const login = require("./Route/loginRoute")
const register = require("./Route/registerRoute")
const user = require("./Route/userRoute")
const Product = require("./Route/ProductRoute")
const Category = require("./Route/CategoryRoute")
const Order = require("./Route/OerderRoute")
 require('dotenv').config()
 
const app = express()

 const connectMongo =require("./MongoDB/ConnectMongo")
 const  bodyParser = require('body-parser')
const cors = require("cors")



app.use(cors({origin:"http://localhost:5173"}))
 app.use(express.json())
 
app.use(express.urlencoded({extended:false}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/productImage",express.static(__dirname +  "/upload/productImage"))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./upload")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
  
  const upload = multer({ storage: storage })



//  app.use("login",login)
 
app.use("/api/v1",login) 
app.use("/api/v1",register) 
app.use("/api/v1",user) 
app.use("/api/v1",Product)
app.use("/api/v1",Category)
app.use("/api/v1",Order)
app.post("/image",upload.single("avtar"),(req,res)=>{
      res.json(req.file)
})
connectMongo()
app.listen(4000,()=>{
    console.log(`port listen ${process.env.PORT}`)
})