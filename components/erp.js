'use strict';

var request = require("request");

module.exports  = {
  metadata: () => ({
        "name": "erp",
        "properties": {},
        "supportedActions": []
    }),

    invoke: (conversation, done) =>{
      var done1 = false
      var res = ''

      var options = {
          method: 'GET',
          url: "https://adc4-zazf-fa-ext.oracledemos.com/fscmRestApi/resources/11.13.18.05/purchaseOrders/1904",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic Y2FsdmluLnJvdGg6VkZpMzg5NTc=',
              json: true
          }
      };

      request.get(options, function(error, response, body){

          //body =  JSON.parse(body.toString());
          body =  JSON.parse(JSON.stringify(body));
          
          done1 = true;

          res = body;
          
      });
      require('deasync').loopWhile(function(){return !done1;});

        conversation.reply(res);
        conversation.transition();
        done();
    }
};