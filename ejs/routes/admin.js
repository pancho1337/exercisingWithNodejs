const express = require('express')
const path = require('path')

const router = express.Router()

const products = []

router.get("/add-product", (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'pug add ',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
    // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"))
    // next()
})

router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    products.push({ title: req.body.title })
    res.redirect("/")
})

exports.routes = router;
exports.products = products; 