var http = require('http')

var server = http.createServer(function (request, response) {

    var data = '';
    
    request.on('data', function (chunk) {
        data += chunk;
        console.log('count: 999999999', data);
    });
    request.on('end', function () {
        var requestModel;
        var responsedata;
        var toggle="";

        if (data == '') {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end('{"message":"no data posted"}');
            return;
        }
        requestModel = JSON.parse(data);
        response.writeHead(200, { 'Content-Type': 'application/json' });

        switch (requestModel.event) {

            case "ice":
          
            if(requestModel.domain=="pstn"){
              toggle="kumar";
            }else{
                toggle=requestModel.to.endpoint;
            }
        
                responsedata = {

                    instructions: [{
                        name: "say",
                        text: "Hello, welcome to my minicasa",
                        locale: "en-US"
                    }],

                    action: {

                        name: "connectConf",
                        conferenceId: "myConference",
                        moh: "ring",
                        
                        name: "connectmxp",
                        destination: {
                            type: "username",
                            endpoint:toggle,
                        },
                                      
                    },                   

                };             
                break;
            case "ace":
                responsedata = {
                    "instructions": [],
                    "action": {
                        "name": "continue"
                    }
                };
                break;

            default:
                responsedata = {}
        }
      
        response.end(JSON.stringify(responsedata));         
    }
    );
});
server.listen(5500);







