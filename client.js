
const net = require('net');
const readline = require('readline');

var client = net.connect({port:3333, host:'localhost'}, function(){
         console.log("I am Connected"); 
         client.write("hello, nice to meet u");
      });

client.on('data', function(data){
      console.log('msg:', data.toString());
   });

var rhandler = readline.createInterface({
         input:process.stdin,
         output:process.stdout
      });

rhandler.setPrompt('msg>');
rhandler.prompt();
rhandler.on('line', function(line){
         client.write(line);
         rhandler.prompt();
      });

function msg(data){
   console.log("console data: ", data);
}
