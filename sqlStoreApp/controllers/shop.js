const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        // console.log(products)
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Product List",
            path: "/products"
        })
        // next()
    })
}

exports.getProduct = (req, res, next) => {
    //extract productId you declared on route from req.params
    const prodId = req.params.productId
    Product.findById(prodId, (product) => {
        console.log("product", product)
        res.render("shop/product-detail", {
            product: product,
            pageTitle: "Product Detail",
            path: "/products"
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: "Shop",
                path: '/'
            })
        })
        .catch(err => {
            console.error
        })
}

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    // console.log("id", prodId)
    Product.findById(prodId, (product) => {
        // console.log("id", product)
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: 'orders',
        pageTitle: 'Your Orders'
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}