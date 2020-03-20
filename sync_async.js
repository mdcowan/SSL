var http = require('http');

var myname = function(value){  
  return "Here is my IP address "+value+",";
}

function callHttpbin() {   
  return new Promise((resolve, reject) => {
    http.get(
      'http://httpbin.org/ip',
      function(response) {
        var str="";
        response.setEncoding('utf8');
        response.on('data', function(data){
        str += data;
        });

        response.on('end', function() {
          var result = JSON.parse(str);
          myips = result.origin;
          
          if (myips){
            resolve(myips)
          }else{
            reject(Error("Something went wrong"))
          }
        });
      } 
    );
  });
}

async function executeAsyncTask(){
  const valueA = await callHttpbin() 
  const valueB = myname(valueA);
  console.log(valueB+" "+valueA)
}

executeAsyncTask()
// Output Here is my IP address 149.24.160.1, 149.24.160.1