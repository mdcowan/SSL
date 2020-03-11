var fs = require("fs")
var http = require("http")
var path = require("path")
var url = require("url")

http.createServer(function(req,res){

    /*get the request URL from the browser then use the URL library
    to chop that into pieces and create an object so now the parse 
    contains an object with the information that is gathered from the URL
    */
    var parsed = url.parse(req.url)
    //now we can use parse from the path library for the parsed result
    var filename = path.parse(parsed.pathname)
    var finen = ""
    if(filename.name==""){
        filen = "index"
    }else{
        filen = filename.name
    }

    fs.readFile(filen+".html",function(err, data){

        res.writeHead(200) //header()
        //this is how to pass data to the HTML page.
        //a variable is created with data in it.
        //the variable is then called in the HTML page JavaScript
        res.write("<script>var name = 'Mike'</script>")
        res.end(data)

    })

}).listen("8080")