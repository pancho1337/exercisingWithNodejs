const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    next();
})

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})
