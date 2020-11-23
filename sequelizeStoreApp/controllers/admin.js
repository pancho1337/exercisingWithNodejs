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
    // Product.findByPk(prodId)
    req.user
        .getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0]
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
        .catch(err => {
            console.log(err)
        })
}



exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Shop',
                path: '/'
            })
        })
        .catch(err => {
            console.log(err)
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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        // Product.create({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description
        //     // userId: req.user.id
        // })
        .then(res => {
            console.log("created the product")
            res.redirect("/admin/products")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save()
        })
        .then(result => {
            console.log("product was updated")
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
        .then(prod => {
            return prod.destroy()
        })
        .then(result => {
            console.log("deleted Item")
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}