'use strict';

var request = require("request");

module.exports  = {
  metadata: () => ({
        "name": "allPurchaseOrders",
        "properties": {},
        "supportedActions": []
    }),

    invoke: (conversation, done) =>{
        var done1 = false;
        var res;
    
        var options = {
            method: 'GET',
            url: "https://adc4-zazf-fa-ext.oracledemos.com/fscmRestApi/resources/11.13.18.05/purchaseOrders",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y2FsdmluLnJvdGg6VkZpMzg5NTc=',
                json: true
            }
        };
    
        request.get(options, function(error, response, body){
    
            body =  JSON.parse(body.toString());
            //body =  JSON.parse(JSON.stringify(body));
            
            done1 = true;
     
            res = body.items.map((order) => {
                return `Here is the basic information for Puchase Order #${order.POHeaderId}:\nOrderNumber: ${order.OrderNumber}\nBuyer: ${order.Buyer}\nSupplier: ${order.Supplier}\nTotal: ${order.Total}\nDescription: ${order.Description}\n`;
            });
            
        });
        require('deasync').loopWhile(function(){return !done1;});

        // return each purhcase order
        res.forEach(curr => conversation.reply(curr));
        conversation.transition();
        done();
    }
};