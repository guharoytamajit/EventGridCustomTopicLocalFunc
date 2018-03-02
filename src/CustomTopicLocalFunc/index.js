module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var header = req.headers['aeg-event-type'];
    if(header && header === 'SubscriptionValidation'){
        var event = req.body[0];
         var isValidationEvent = event && event.data && 
                                 event.data.validationCode &&
                                 event.eventType && 
                                 event.eventType == 'Microsoft.EventGrid.SubscriptionValidationEvent';
         if(isValidationEvent){
            context.res = {
                status: 200, 
                body: { validationResponse: event.data.validationCode },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
         }
    }
    else {
        for (var events in req.body) {
            var event = req.body[events];
            var make = event.data.make;
            var model = event.data.model;
            context.log("We've got a new car of make " + make + " and model " + model + "!");
        }
    }
    context.done();
};