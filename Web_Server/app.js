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
    let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let rePass = /^[a-zA-Z]\w{3,14}$/

    if(req.body.email == ""){
        errors.push("Email is required")
    }else if (!reEmail.test(req.body.email)){
        errors.push("Email is not valid")
    }
    if(req.body.password == ""){
        errors.push("Password is required")
    }else if(!rePass.test(req.body.password)){
        errors.push("Password is not valid")
    }

    sess = req.session

    //write conditional here if matching UN and PW 
    //email mike@aol.com pass abc123
    //good show profile...bad show index with errors
    if (errors.length === 0){
        if((req.body.email != "mike@aol.com" || req.body.password != "abc123")){
            errors=["Not an authenticated user"]
            sess.loggedin = false
            res.render("index", {pagename:"home",errors:errors})
        }else{
            sess.loggedin = true
            res.render("profile", {pagename:"profile",sess:sess})
        }
    }else{
        sess.loggedin = false
        res.render("index", {pagename:"home",errors:errors})
    }
   
   //session.email = req.body.email
})

router.post("/register", function(req,res){
    var errors = []
    if(req.body.firstname == ""){
        errors.push("First name is required")
    }
    if(req.body.lastname == ""){
        errors.push("Last name is required")
    }
    if(req.body.address == ""){
        errors.push("Street Address is required")
    }
    if(req.body.city == ""){
        errors.push("City is required")
    }

    let reState = /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/
    if(req.body.state == ""){
        errors.push("State is required")
    }else if(!reState.test(req.body.state)){
        errors.push("State must be in abbreviation format")
    }

    let reZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    if(req.body.zip == ""){
        errors.push("Zip code is required")        
    }else if(!reZip.test(req.body.zip)){
        errors.push("Zip code is not valid")
    }  

    if(req.body.age == ""){
        errors.push("Age is required")
    }
    if(req.body.gender == ""){
        errors.push("Gender is required")
    }
    if(req.body.consent == ""){
        errors.push("Consent is required")
    }
    if(req.body.bio == ""){
        errors.push("Bio is required")
    }



  

    if (errors.length == 0){
        let success = "Registration Successful"
        //console.log(errors,success)
        res.render("index", {pagename:"home",success:success})
    }else{
        res.render("index", {pagename:"home",errors:errors})
    }

})

app.use(express.static('public'))
app.use("/",router)
var server = app.listen("8080")



