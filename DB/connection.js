import mysql2 from 'mysql2'

const connection_db = mysql2.createConnection({
    host:'localhost',
    database:'assignmentdb',
    user:'root',
    password:''
})

export default connection_db