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



let ejs = require("ejs")
const router = express.Router()

var app = express()
app.set("view engine","ejs")
app.engine("ejs",require("ejs").__express)

var bodyParser = require("body-parser") 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const session = require("express-session")
app.use(session({secret:"secret", saveUninitialized:true,resave:true}))
var sess

//default route
router.get("/", function(req,res){
    sess = req.session
    //console.log(sess)
    //note that we are no longer using file write.
    //here we are pasing data to the file - variable pagename = Home
    res.render("index", {pagename:"home",sess:sess}) //views/index.ejs
})
router.get("/about", function(req,res){
    sess = req.session
    //note that we are no longer using file write.
    //here we are pasing data to the file - variable pagename = About
    res.render("about", {pagename:"about",sess:sess}) //views/about.ejs
})

router.get("/profile", function(req,res){
    sess = req.session
    //check that it's defined
    if(typeof(sess)=="undefined" || sess.loggedin !=true){
        var errors = ["Not an authenticated user"]
        res.render("index", {pagename:"home",errors:errors})
    }else{
        res.render("profile", {pagename:"profile",sess:sess})
    }
})

router.get("/logout", function(req,res){
    sess = req.session
    sess.destroy(function(err){
        res.redirect("/")
    })
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
    let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!reEmail.test(req.body.email)){
        errors.push("Email is not valid")
    }
    let rePass = /^[a-zA-Z]\w{3,14}$/
    if(!rePass.test(req.body.password)){
        errors.push("Password is not valid")
    }

    //write conditional here if matching UN and PW 
    //email mike@aol.com pass abc123
    //good show profile...bad show index with errors
    /*if(){
    var errors = ["Not an authenticated user"]
        res.render("index", {pagename:"home",errors:errors})
    }else{
        res.render("profile", {pagename:"profile",sess:sess})
    }
    */

   sess = req.session
   sess.loggedin = true
   session.email = req.body.email
    //console.log(errors)
    res.render("profile", {pagename:"home",errors:errors,sess:sess})
})

app.use(express.static('public'))
app.use("/",router)
var server = app.listen("8080")



