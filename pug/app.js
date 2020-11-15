// const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
//set pug to be the templating engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

const adminData = require('./routes/admin')
const shopRoutes = require("./routes/shop")
app.use(bodyParser.urlencoded({ extended: false }))
//deja que agares archivos como un OS comenzando desde este directorio
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
// const server = http.createServer(app)
// server.listen(3000)