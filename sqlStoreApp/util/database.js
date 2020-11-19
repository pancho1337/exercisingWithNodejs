const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'sqlStoreApp'
})

//dont be restard with promise giving cb
module.exports = pool.promise()