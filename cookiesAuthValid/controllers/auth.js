const User = require("../models/user")

exports.getLogin = (req, res, next) => {
    // console.log(req.get('Cookie'))
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim()
    // console.log(isLoggedIn)
    console.log(req.session)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}
//every request is treated totally indepedent from each other thus changes to a req obj will be lost upon res
exports.postLogin = (req, res, next) => {
    //set up a simple cookie -traking users! ; Max-Age=259200
    // res.setHeader('Set-Cookie', 'loggedIn=true')
    User.findById('5fc073f884d35d1bc17eb730')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            //save func insures that the redirect starts after you have saved the user to db
            res.session.save(err => {
                console.log(err)
                res.redirect('/')
            })

        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}