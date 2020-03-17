//Enable JS Strict Mode
//see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict"

var fs = require("fs") //https://nodejs.dev/the-nodejs-fs-module
var http = require("http") //https://nodejs.org/api/http.html
var path = require("path") //https://nodejs.org/api/path.html
var url = require("url") //https://nodejs.org/api/url.html

//install JS libraries
// sudo npm install -g express
// https://expressjs.com/
// sudo npm install -g ejs
// https://www.npmjs.com/package/ejs
// sudo npm install -g request 
// https://github.com/request/request
// sudo npm install -g body-parser
// https://www.npmjs.com/package/body-parser
// npm install --save path


// import JS libraries
var express = require("express") 
var request = require("request")
var bodyParser = require("body-parser") 


let ejs = require("ejs")
const router = express.Router()
var app = express()
app.set("view engine","ejs")
app.engine("ejs",require("ejs").__express)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",router)

router.get("/", function(req,res){
    //note that we are no longer using file write.
    //here we are pasing data to the file - variable pagename = Home
    res.render("index", {pagename:"home"}) //views/index.ejs
})
router.get("/about", function(req,res){
    //note that we are no longer using file write.
    //here we are pasing data to the file - variable pagename = About
    res.render("about", {pagename:"about"}) //views/about.ejs
})

//Because this route is "post", its only purpose is to pass data
//from the page to the function here.
router.post("/login", function(req,res){
    //console.log(req.body)
    //console.log(req.body.email)
    //console.log(req.body.password)

    var errors = []
    if(req.body.email == ""){
        errors.push("Email is required")
    }
    if(req.body.password == ""){
        errors.push("Password is required")
    }
    if(!/^[a-zA-Z]\w{3,14}$/.test(req.body.email)){
        errors.push("Email is not valid")
    }
    if(!/^[a-zA-Z]\w{3,14}$/.test(req.body.password)){
        errors.push("Password is not valid")
    }

    res.render("index", {pagename:"home", errors:errors})
})


var server = app.listen("8080")



