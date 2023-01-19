const mysql = require('mysql')
    const dotenv =require('dotenv')
    dotenv.config();
//sql connection
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.password,
    database: process.env.database
     
})
connection.connect((err)=> {
  if(!err)
  console.log('Connection Established Successfully');
  else
  console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
  });
  


  //export
  module.exports =connection;