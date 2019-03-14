'use strict';

var request = require("request");

module.exports  = {
  metadata: () => ({
        "name": "specificPurchaseOrder",
        "properties": {
            POID: { required: true, type: 'int' },
          },
        "supportedActions": []
    }),

    invoke: (conversation, done) =>{
        var done1 = false
        var res = ''
        const { POID } = conversation.properties();
    
        var options = {
            method: 'GET',
            url: `https://adc4-zazf-fa-ext.oracledemos.com/fscmRestApi/resources/11.13.18.05/purchaseOrders/${POID}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y2FsdmluLnJvdGg6VkZpMzg5NTc=',
                json: true
            }
        };
    
        request.get(options, function(error, response, body){
            
            body =  JSON.parse(body.toString());
            
            done1 = true;
    
            res = `Here is the basic information for Puchase Order #${body.POHeaderId}:\nOrderNumber: ${body.OrderNumber}\nBuyer: ${body.Buyer}\nSupplier: ${body.Supplier}\nTotal: ${body.Total}\nDescription: ${body.Description}`;
            
        });
        require('deasync').loopWhile(function(){return !done1;});
        

        conversation.reply(res);
        conversation.transition();
        done();
    }
};