// const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
//deja que agares archivos como un OS comenzando desde este directorio
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
// const server = http.createServer(app)
// server.listen(3000)