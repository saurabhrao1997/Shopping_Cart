const express = require("express")

const router = express.Router()
const {LoginController} = require("../Controler/loginController")


router.route("/login").post(LoginController)




module.exports = router