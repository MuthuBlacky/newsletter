const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/signup.html");
});
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",(req,res)=>{
   const firstName = req.body.firstname;
   const lastName = req.body.lastname;
   const mailid = req.body.mailid;  
   const data = {
     members : [
        {
            email_address : mailid,
            status : "subscribed",
            merge_fields : {
              FNAME : firstName,
              LNAME : lastName,
            }
        }
     ]
   }
   const JSONData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/10d7c9a390";
   const option = {
      method :"POST",
      auth : "mp:665ba91eee2351d84ee1282aafcfbc7e-us21"
    }
    var request = https.request(url,option,(responce)=>{
        responce.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });
    request.write(JSONData);
    request.end();
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
//'https://us21.api.mailchimp.com/3.0/'
//API ID
// 665ba91eee2351d84ee1282aafcfbc7e-us21
//Audience id
//10d7c9a390
