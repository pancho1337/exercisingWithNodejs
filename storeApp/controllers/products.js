let Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product ',
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
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Product List",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
        })
        next()
    })

}