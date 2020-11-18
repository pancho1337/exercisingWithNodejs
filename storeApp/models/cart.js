const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '../data', 'cart.json')

module.exports = class Cart {
    // constructor() {
    //     this.products = [];
    //     this.totalPrice = 0;
    // }
    // Algo mucho mejor que recrear el cart seria
    // Hacer un fetch para el Cart
    // Analizar el Cart y encontrar productos existentes
    // Agregar un nuevo Cart o incrementar la cantidad
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(data)
            }
            const exisitingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            )
            const exisitingProduct = cart.products[exisitingProductIndex]
            let updatedProduct
            if (exisitingProduct) {
                updatedProduct = { ...exisitingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[exisitingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + productPrice
            console.log(cart)
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) {
                return
            }
            const updatedCart = { ...JSON.parse(data) }
            const product = updatedCart.products.find(prod => prod.id === id)
            if (!product) {
                return
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }
    static getProducts(cb) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data)
            if (err) {
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}