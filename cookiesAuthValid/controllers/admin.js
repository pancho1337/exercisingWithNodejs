let Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login')
    // }

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const imageUrl = req.body.imageUrl
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    })
    product
        .save()
        .then(result => {
            console.log("===> created the product")
            res.redirect("/admin/products")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        //will only give what you want - what you exclude
        // .select('title price -_id')
        //will populate that user id to its object, 2nd param indicates only what you want
        // .populate('userId', 'name')
        .then(products => {
            console.log(products)
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Shop',
                path: '/admin/products'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId)
        .then(product => {
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

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    // Product.updateOne(
    //     { _id: prodId },
    //     {
    //         $set: {
    //             title: updatedTitle,
    //             price: updatedPrice,
    //             description: updatedDesc,
    //             imageUrl: updatedImageUrl
    //         }
    //     })
    Product.findById(prodId)
        .then(product => {
            // checking type equlity add toString
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/')
            }
            product.title = updatedTitle
            product.price = updatedPrice
            product.description = updatedDesc
            product.imageUrl = updatedImageUrl
            // nested then in order to do a dual redirect
            return product
                .save()
                .then(result => {
                    console.log("product was updated")
                    res.redirect('/admin/products')
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            console.log("deleted Item")
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}