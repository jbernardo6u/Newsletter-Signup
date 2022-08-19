//

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


// const client = require("mailchimp-marketing");
//
// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });
//
// const run = async () => {
//   const response = await client.batches.status("batch_id");
//   console.log(response);
// };
//
// run();




app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const url = "https://api.mailchimp.com/3.0/lists/680c4b1c0c";
  const options = {
    method: "POST",
    auth: "jose_bantu:dv5pdBWd5BkK0J2yvN7CDQ"
  };
  const jsonData = JSON.stringify(data);
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/successful.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  // request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || port, function() {
  console.log("Server is running on port 3000");
});


// API Keys Mailchimp
//dv5pdBWd5BkK0J2yvN7CDQ

//List Id
// 680c4b1c0c
