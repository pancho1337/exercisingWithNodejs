const fs = require('fs')

const requestHandeler = (req, res) => {
    const url = req.url
    const method = req.method;

    if (url === "/") {

        console.log("HITTING IT")
        res.write("<html>")
        res.write("<head><title>panchoDelRancho</title></head>")
        res.write("<body><h1>ubicación principal, tu apodo?</h1></body>")
        res.write('<body><form action="/apodo" method="POST"><input type="text" name="apodo"><button type="submit">click</button></form></body>')
        res.write("</html>")
        res.end()
        return res.end()
    }
    if (url === '/apodo' && method === "POST") {
        const body = [];
        req.on("data", (pedazo) => {
            console.log("armando el body", pedazo)
            body.push(pedazo)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log("parsedBody", parsedBody)
            const apodo = parsedBody.split("=")[1]
            fs.writeFile('./apodo.txt', apodo, (error) => {
                res.statusCode = 302
                res.setHeader("Location", "/")
                return res.end()
            })
        })
    }
    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<head><title>Home Page</title></head>")
    res.write("<body><h1>Home Page</h1></body>")
    res.write("</html>")
    res.end()
}

module.exports = { requestHandeler, other: "other things" };