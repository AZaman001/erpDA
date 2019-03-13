var request = require("request");

function test(){
	var done1 = false
        var res = ''
        //let card;
        //var imagePath = "https://sciencebob.com/wp-content/uploads/2014/11/CleanPennies3.png"
        //var channeltype = conversation.channelType();

        var options = {
            method: 'GET',
            url: "http://api.adviceslip.com/advice"
        };

        request.get(options, function(error, response, body){
             body =  JSON.parse(body.toString());

             done1 = true;

             res = body.slip.advice;
            
        });
        require('deasync').loopWhile(function(){return !done1;});

        console.log(res);
}

test();