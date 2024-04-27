const express = require("express")

const router = express.Router()
// const {LoginController} = require("../Controler/loginController")

const {createCategory,deleteCategory,getCategory,updateCategory} = require("../Controler/CategoryController")



router.route("/category/create").post(createCategory)
router.route("/category/update").put(updateCategory)
router.route("/category/delete").delete(deleteCategory)
router.route("/category/get").get(getCategory)





module.exports = router