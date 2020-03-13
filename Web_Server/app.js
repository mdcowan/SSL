var fs = require("fs")
var http = require("http")
var path = require("path")
var url = require("url")

http.createServer(function(request,response){

    /*get the request URL from the browser then use the URL library
    to chop that into pieces and create an object so now the parse 
    contains an object with the information that is gathered from the URL
    */
    var parsed = url.parse(request.url)
    //now we can use parse from the path library for the parsed result
    var filename = path.parse(parsed.pathname)
    var filen = filename.name==""?"index":filename.name
    var ext = filename.ext==""?".html":filename.ext
    var dir = filename.dir=="/"?"":filename.dir+"/"
    var page = filename.name==""?"index":filename.name

    f=(dir+filen+ext).replace("/","")

    var mimeTypes = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg',
        '.gif' : 'image/gif'
    }

    if(f){
        fs.readFile(f,function(err, data){

            if(page){
                if(mimeTypes.hasOwnProperty(ext)){
                    response.writeHead(200, {'Content-Type' : mimeTypes[ext]}) //header()
                    //this is how to pass data to the HTML page.
                    //a variable is created with data in it.
                    //the variable is then called in the HTML page JavaScript
                    response.write("<script>var page = '"+page+"'</script>")
                    response.end(data, 'utf-8')
                }
            }
    
        })
    }

}).listen("8080", function(){
    console.log("info", 'Server is at port: ' + 8080)
})