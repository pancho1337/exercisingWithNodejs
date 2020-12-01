const bcrypt = require("bcryptjs")
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

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    })
}

//every request is treated totally indepedent from each other thus changes to a req obj will be lost upon res
exports.postLogin = (req, res, next) => {
    //set up a simple cookie -traking users! ; Max-Age=259200
    // res.setHeader('Set-Cookie', 'loggedIn=true')
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login')
            }
            bcrypt
                .compare(password, user.password)
                .then(match => {
                    if (match) {
                        req.session.isLoggedIn = true
                        req.session.user = user
                        //save func insures that the redirect starts after you have saved the user to db
                        return req.session.save(err => {
                            console.log(err)
                            res.redirect('/')
                        })
                    }
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login')
                })
        })
        .catch(err => console.log(err))
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup')
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPW => {
                    const user = new User({
                        email: email,
                        password: hashedPW,
                        cart: { items: [] }
                    })
                    return user.save()
                })
                .then(result => {
                    res.redirect('/login')
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