const fs = require('fs')
const { get } = require('http')
const path = require('path')
const Cart = require('./cart')
const p = path.join(__dirname, '../data', 'products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(data))
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        })
    }
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
    static findById(id, cb) {
        getProductsFromFile((products) => {
            // console.log("from getProductsFromFile model", products)
            const product = products.find(prod => prod.id === id)
            // console.log("from find ID model", product)
            cb(product)
        })
    }
    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }
}