const http = require("http")
const routes = require("./routes.js")

const servidor = http.createServer(routes.requestHandeler)

servidor.listen(3000, () => {
    console.log("server is running 3000")
})
