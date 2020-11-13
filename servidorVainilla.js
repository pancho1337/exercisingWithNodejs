const http = require("http")

const reqListener = (queQuieres, tenCarnalito) => {
    console.log(queQuieres.url, queQuieres.method, queQuieres.headers)
    //cuando algien usa el servidor el servidor se HARD STOP
    //process.exit()
    tenCarnalito.setHeader("Content-Type", "text/html")
    tenCarnalito.write("<html>")
    tenCarnalito.write("<head><title>panchoDelRancho</title></head>")
    tenCarnalito.write("<body><h1>quePex!! dice: el sevidor</h1></body>")
    tenCarnalito.write("</html>")
    tenCarnalito.end()
}

const elServidor = http.createServer(reqListener);

elServidor.listen(3000, () => {
    console.log("elServidor esta activo, bro")
})