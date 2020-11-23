const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express()
//set ejs to be the templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")

// db.execute('SELECT * FROM products')
//     .then(result => {
//         // console.log(result[0], result[1])
//     })
//     .catch(err => {
//         console.log(err)
//     });

app.use(bodyParser.urlencoded({ extended: false }))
//deja que agares archivos como un OS comenzando desde este directorio
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)
// console.log('sequelize', sequelize)

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })


// { force: true }
sequelize.sync()
    .then(result => {
        return User.findByPk(1)
        // console.log(res)
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: "panchoDelRancho",
                email: "pancho@test.com"
            })
        }
        // return Promise.resolved(user);
        return user
    })
    .then(user => {
        console.log(user)
        user.createCart()

    })
    .then(cart => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

