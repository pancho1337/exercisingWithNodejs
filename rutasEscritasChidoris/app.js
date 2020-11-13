const http = require("http")
const routes = require("./routes.js")

const servidor = http.createServer(routes)

servidor.listen(3000)
