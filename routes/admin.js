const adminController = require("../controllers/admin")
const express = require("express")
const router = express.Router()

router.post("/add-product", adminController.postAddProduct)

module.exports = router