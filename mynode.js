// First we have to tell the system that we need the file system access 
// using the Node.JS library.
/*
var fs = require("fs");
*/

//Read the file
//format fs.readFile("fileName", "ENCODING", function(error, contents){WhatToDoWithTheData})
//encoding can be utf8, etc
/*
fs.readFile("myfile.txt","utf8",function(err, contents){
    console.log(contents);
});
*/

//write the file
//format fs.writeFile("fileName", "string" ,"ENCODING", function(error){WhatToDoWithTheData})
//encoding can be utf8, etc
/*
fs.writeFile("myNodeFile.txt","test string","utf8",function(err){
    console.log("Error: "+err);
    console.log("done");
});
*/

//Using readLine from Node.JS library

//create an interface to capture whatever the user is typing in the command line
const readline = require('readline');
const rl = readline.createInterface({
    //input and output to/from "proccess", which is the node.js application
    input: process.stdin,
    output: process.stdout
});

//this variable can now be used to ask a question
// format rl.question("Text of the question to ask the user", (variableHoldingInput)=>{do suff with the variable})
rl.question("What is your name?",(name)=>{
    rl.question("What is your favorite color?",(color)=>{
        console.log(name+" "+color)
        //close the readLine!
        rl.close()
    })
})
