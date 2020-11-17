let Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'pug add ',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
    // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"))
    // next()
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect("/")
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products)
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
        })
        next()
    })

}