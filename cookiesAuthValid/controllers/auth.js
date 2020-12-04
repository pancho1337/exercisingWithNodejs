const crypto = require('crypto')
const bcrypt = require("bcryptjs")
// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require("../models/user")

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: "ma key"
//     }
// }))

exports.getLogin = (req, res, next) => {
    // console.log(req.get('Cookie'))
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim()
    // console.log(isLoggedIn)
    console.log(req.session)
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    })
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
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
                req.flash('error', 'Invalid email or password')
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
                    req.flash('error', 'Invalid email or password')
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
                req.flash('error', 'Invalid email')
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
                    // return transporter.sendMail({
                    //     to: email,
                    //     from: "francisco@holacode.com",
                    //     subject: "Signup success",
                    //     html: '<h1>Thank you for joining us</h1> <p>hope you find it what your looking for </p>'
                    // })
                })
                .catch(err => {
                    console.log(err)
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

exports.getReset = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/reset', {
        path: '/reset',
        errorMessage: message,
        pageTitle: "Password Reset"
    })
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
            return res.redirect('/reset')
        }
        const token = buffer.toString('hex')
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', "Server Error =)")
                    return res.redirect('/reset')
                }
                user.resetToken = token
                user.resetTokenExpiration = Date.now() + 3600000
                return user.save()
            })
            .then(result => {
                res.redirect('/')
                transporter.sendMail({
                    to: req.body.email,
                    from: "francisco@holacode.com",
                    subject: "Signup success",
                    html: `
                    <h1>Password Reset Requested</h1>
                    <p> Click here to reset <a href="http://localhost:3000/reset/${token}">reset link</a>
                    `
                })
            })
            .catch(err => console.log(err))
    })
} 