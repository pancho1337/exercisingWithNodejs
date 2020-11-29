const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
//create a constructor function by passing your session 
const MongoDbStore = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://test:test@cluster0.hq0up.mongodb.net/freeCodeCamp?retryWrites=true&w=majority'

const app = express()
// use the constructor function to create your store w/ params
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
//create your MidWare func with obj config / can add cookie params w/ { expires: 666, etc: etc }
app.use(session({
    secret: 'panchosSecret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById("5fc073f884d35d1bc17eb730")
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use(authRoutes)
app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose.connect(
    MONGODB_URI,
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
