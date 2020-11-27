const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const errorController = require('./controllers/error')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    User.findById("5fc073f884d35d1bc17eb730")
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose.connect(
    'mongodb+srv://test:test@cluster0.hq0up.mongodb.net/freeCodeCamp?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(restult => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'pancho',
                        email: 'pancho@test.com',
                        cart: {
                            items: []
                        },
                        orders: {
                            order: []
                        }
                    })
                    user.save()
                }
            }
            )
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })
