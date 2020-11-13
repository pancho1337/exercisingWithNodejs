const express = require('express')
const router = express.Router()

router.get("/hola", (req, res, next) => {
    console.log("middleware handeling test ")
    res.send('<form action="/admin/apodo" method="POST"><input type="text" name="apodo"><button type="submit">agrega tu apodo</button></form>')
    // next()
})

router.post("/apodo", (req, res, next) => {
    console.log(req.body.apodo)
    res.redirect("/")
})

// router.use("/", (req, res, next) => {
//     console.log("im another middleware")
//     res.send("<h1>que pex de express</h1>")
//     next()
// })


module.exports = router;