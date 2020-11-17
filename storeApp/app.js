const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')

const app = express()
//set ejs to be the templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
//deja que agares archivos como un OS comenzando desde este directorio
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000, function () {
    console.log('Example storeApp listening on port 3000!')
})
