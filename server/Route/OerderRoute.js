const express = require("express")

const router = express.Router()
const {createOrder,getAllOrder,deleteProduct} = require("../Controler/OrderController")


router.route("/order/create").post(createOrder)
router.route("/order/get").get(getAllOrder)
router.route("/order/delete").delete(deleteProduct)




module.exports = router