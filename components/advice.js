'use strict';

var request = require("request");

module.exports  = {
  metadata: () => ({
        "name": "advice",
        "properties": {},
        "supportedActions": []
    }),

    invoke: (conversation, done) =>{
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

        /*
        var cardsTemplate = {
             "type": "card",
             "layout": "horizontal",
             "cards": []
        };

        card = {
            title : "Two Cents of the Day",
            imageUrl: imagePath,
            description : res,
        };

        cardsTemplate.cards.push(card);
        let message = new MessageModel(cardsTemplate);

        if (channeltype.toUpperCase() == "IOS" || channeltype.toUpperCase() == "WEB" || channeltype.toUpperCase() == "WEBHOOK" || channeltype.toUpperCase() == "FACEBOOK MESSENGER") {
            conversation.reply({ text : res});
        }
        else {
            conversation.reply(message.messagePayload());
        }
        */
        
        conversation.reply({ text : res});
        conversation.transition();
        done();
    }
};