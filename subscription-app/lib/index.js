let
//partners basic details
    PARTNERS = require('./entities/partners'),
    ACCOUNTS = require('../Data/accounts'),
    SUBSCRIPTION = require('./bll/subscription'),
    UTILITY_METHODS = require('./bll/utility_methods'),
    LOGGER = require('./logger'),
    fileName = 'index.js';

//entry point of the application; an immediately invoked function 
(() => {
    let subscriptions = {},
        methodName = 'main';

    try {
        //loop through each user to get subscription details
        ACCOUNTS.users.forEach(function(userData) {
            LOGGER.INFO(fileName, methodName, `Processing for username: ${userData.name} and number:${userData.number}`);
            //injecting UTILITY_METHODS, PARTNERS, LOGGER into GetSubscription
            let individualAccount = SUBSCRIPTION.GetSubscription(userData, UTILITY_METHODS, PARTNERS, LOGGER);
            if (individualAccount != false) {
                subscriptions = Object.assign({}, subscriptions, individualAccount);
            }

        }, this);
    } catch (err) {
        LOGGER.ERROR(fileName, methodName, err.message);
    }

    //adding "subscriptions" property
    subscriptions = {
        "subscriptions": subscriptions
    };

    //creating result file
    if (Object.keys(subscriptions).length === 0) {
        LOGGER.INFO(fileName, methodName, 'Subscription does not exists. No file created.');
    } else {
        UTILITY_METHODS.CreateSubscriptionFile(subscriptions, LOGGER);
    }

    //freeing the memory 
    subscriptions = undefined;
    PARTNERS = undefined;
    ACCOUNTS = undefined;
    SUBSCRIPTION = undefined;
    UTILITY_METHODS = undefined;
    LOGGER = undefined;
    fileName = undefined;
    methodName = undefined;
})();