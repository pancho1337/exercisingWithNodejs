const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    User.findById("5fbe0cc1b3148ea1322e940f")
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id)
            next()
        })
        .catch(err => console.log(err))
})

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})
