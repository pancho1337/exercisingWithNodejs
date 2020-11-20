let Product = require('../models/product')

exports.getEditProduct = (req, res, next) => {
    // console.log("fire")
    //get query param from client url
    const editMode = req.query.edit
    if (!editMode) {
        // console.log("error fire")
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId, product => {
        if (!product) {
            console.log("theres is not product redirect to home")
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
}



exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Shop',
            path: '/'
        })
    })
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const price = req.body.price
    const product = new Product(null, title, imageUrl, description, price)
    product.save()
        .then(() => {
            res.redirect("/");
        })
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
    updatedProduct.save()
        .then(() => {
            fire()
            res.redirect("/");
        })
        .catch(err => console.log(err))
    // res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}