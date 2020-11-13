// const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).send("<h1>page not found</h1>")
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
// const server = http.createServer(app)
// server.listen(3000)