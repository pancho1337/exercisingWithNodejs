const express = require('express')
// const path = require('path')
const adminController = require('../controllers/admin')

const router = express.Router()

router.get("/add-product", adminController.getAddProduct)

router.get("/products", adminController.getProducts)

router.post("/add-product", adminController.postAddProduct)
//http://localhost:3000/admin/edit-product/0.6420194202638481?edit=true
router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

exports.routes = router;
// exports.products = products;