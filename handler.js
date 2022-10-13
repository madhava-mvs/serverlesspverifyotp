'use strict';

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});



module.exports.hello = async (event) => {
  let request = JSON.parse(event.body)
  let otp = request.enteredotp
  let email = request.email;
  let sqlverify = "select id from crm.tblusers where txtOTP = '"+otp+"' and txtEmail = '"+email+"';"
  let prom = await new Promise((resolve, reject)=>{
  con.query(sqlverify, function(err, result){
    if(err) throw err;
    console.log(result)
    if(result == ""){
      reject("wrong otp")
    }
    else{
      resolve("your verified")
    }
  })
})

return prom
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
