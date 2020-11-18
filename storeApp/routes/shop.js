const express = require('express')
const shopController = require('../controllers/shop')

const router = express.Router()

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

// router.get("/products/delete") if you had this route you would have to put it on top of :productId given that express would default to :productId if it was on top

router.get("/products/:productId", shopController.getProduct)

router.get("/cart", shopController.getCart)

router.post("/cart", shopController.postCart)

router.post("/cart-delete-item", shopController.postCartDeleteProduct)

router.get("/orders", shopController.getOrders)

router.get("/checkout", shopController.getCheckout)

module.exports = router