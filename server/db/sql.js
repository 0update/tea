const mysql=require('mysql')
let connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'12345678',
	database:'vue_store'
})
module.exports=connection