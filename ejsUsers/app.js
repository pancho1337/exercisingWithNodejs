const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const users = []

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Add User' })
})

app.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'User', users: users })
})

app.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.username })
    res.redirect('/users')
})

app.listen(3000)