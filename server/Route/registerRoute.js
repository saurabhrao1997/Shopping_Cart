const express = require("express")
const router = express.Router()

const {createUser,updateUser,getUser} = require("../Controler/registerController")

router.route("/register").post(createUser).put(updateUser).get(getUser)

module.exports = router