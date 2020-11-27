const Product = require('../models/product')
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
            })
        })
        .catch(err => [
            console.log(err)
        ])
}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(prods => {
            res.render('shop/index', {
                prods: prods,
                pageTitle: "Shop",
                path: '/'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId)
        .then(product => {
            console.log(product)
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products"
            })
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
        .then(product => {
            console.log("product", product)
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result)
            res.redirect('/cart')
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: products
            })
        })
        .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    //user following to get users cart
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log('user postOrder', user.cart.items)
            const products = user.cart.items.map(item => {
                //user spread operator along ._doc to get full object instead of only the id
                return { quantity: item.quantity, product: { ...item.productId._doc } }
            })
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })
            return order.save()
        })
        .then(result => {
            return req.user.clearCart()
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    Order
        .find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(err => console.log(err))
}