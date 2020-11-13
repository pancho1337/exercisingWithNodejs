const http = require("http")
const fs = require('fs')

const elServidor = http.createServer((pidenDesde, lesDamos) => {
    const url = pidenDesde.url
    if (url === "/") {
        lesDamos.write("<html>")
        lesDamos.write("<head><title>panchoDelRancho</title></head>")
        lesDamos.write("<body><h1>ubicación principal, tu apodo?</h1></body>")
        // form para un post
        lesDamos.write('<body><form action="/apodo" method="POST"><input type="text" name="apodo"><button type="submit">click</button></form></body>')
        lesDamos.write("</html>")
        lesDamos.end()
        //para que node se que atorado en la funcion y se salga
        return lesDamos.end()
    }
    const method = pidenDesde.method;
    if (url === '/apodo' && method === "POST") {
        console.log("HITTING POST")
        //vanilla parsing incomming data 
        const body = [];
        pidenDesde.on("data", (pedazo) => {
            console.log("armando el body", pedazo)
            body.push(pedazo)
        })
        return pidenDesde.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log("parsedBody", parsedBody)
            const apodo = parsedBody.split("=")[1]
            fs.writeFile('./apodo.txt', apodo, (error) => {
                // ya la metimos 
                lesDamos.statusCode = 302
                lesDamos.setHeader("Location", "/")
                return lesDamos.end()
            })
        })
        //que pasa si metes esta loquica despues del writefileSync?
        // lesDamos.statusCode = 302
        // lesDamos.setHeader("Location", "/")
        // return lesDamos.end()
    }
    lesDamos.setHeader("Content-Type", "text/html")
    lesDamos.write("<html>")
    lesDamos.write("<head><title>Home Page</title></head>")
    lesDamos.write("<body><h1>Home Page</h1></body>")
    lesDamos.write("</html>")
    lesDamos.end()

});


elServidor.listen(3000, () => {
    console.log("elServidor esta activo, bro")
})


//Pregunta. Piensa de un restaurante donde hay solo una personal trabando si tiene clientes pultiples que pasa con sus aciones de acuerdo con las ordenes?