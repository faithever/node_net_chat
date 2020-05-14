const net = require('net');

var Clients = [];

var server = net.createServer(function(client){
         console.log("New client come in....");
         client.on('data', function(data){
               broadCast(client, data);
            });
         client.on('error', function(err){
               console.log("Socket Error. The code is ", JSON.strinfy(err));
            });
         client.on('end', function(){
               console.log(" Client end");
            });
         client.on('close', function(){
               console.log(" socket close");
               (function(client){
                   Clients.forEach(function(sock){
                         if (client == sock)
                         {
                            let pos = Clients.indexOf(sock);
                            console.log("index pos is ", pos);
                            Clients.splice(pos, 1);
                         }
                      });
                })(client);
            });
         Clients.push(client);
      });

server.listen(3333, function(){
      console.log("Start Listening....");
   });

function broadCast(client, data)
{
   Clients.forEach(function(sock){
            if (client != sock)
               WriteData(sock, data);
         });
}

function WriteData(client, data){
   const result = client.write(data);
   //console.log("The write result is ", result);
}

