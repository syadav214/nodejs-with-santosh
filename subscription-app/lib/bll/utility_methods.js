const fs = require('fs'),
    fileName = 'utility_methods.js';

const UTILITY_METHODS = {
    //params => startdate, enddate, dateToCompare
    //response => -1, 0 or 1
    DateComparison: (startDate, endDate, dateToCompare) => {
        if (startDate > dateToCompare) {
            return -1;
        }
        //to check date fall in between the start and end date
        else if (startDate < dateToCompare && endDate > dateToCompare) {
            return 0;
        } else if (endDate < dateToCompare) {
            return 1;
        }
    },
    //params => object of subscriptionsData
    //response => no return value; log on successful file creation and on the ERROR
    CreateSubscriptionFile: (subscriptionsData, LOGGER) => {
        fs.writeFile('../output/result.json', JSON.stringify(subscriptionsData), function(err) {
            if (err) {
                LOGGER.ERROR(fileName, 'CreateSubscriptionFile', err.message);
            } else {
                LOGGER.INFO(fileName, 'CreateSubscriptionFile', 'Subscription file created.');
            }
        });
    },
    //params => startDate, no of months
    //response => updated date or null
    GetEndDate: (startDate, period) => {
        if (typeof period !== 'undefined') {
            startDate.setMonth(startDate.getMonth() + period);
            return startDate;
        } else {
            return null;
        }
    },
    //params => userNumber,partnersIndex, partnersOfferDates, PartnerData, partnerName, LOGGER
    //response => array of OfferDates
    GetOffersDates: (userNumber, partnersIndex, partnersOfferDates, PartnerData, partnerName, LOGGER) => {

        let grantedOffers,
            methodName = 'GetOffersDates',
            /*will use updateAbleIndex to get value of existing partners offers (current - 1) 
            and it does not existing then use index 'ZERO' */
            updateAbleIndex = (partnersIndex - 1) < 0 ? 0 : partnersIndex - 1;

        try {
            //get grantedOffers for a single account
            grantedOffers = PartnerData.grants.filter(function(val) {
                return val.number == userNumber;
            });

            //loop through grantedOffers
            grantedOffers.forEach(function(element) {
                let startDate = new Date(element.date),
                    OfferDate = new Date(element.date);

                //proceed if date is valid
                if (startDate != "Invalid Date") {
                    OfferDate = UTILITY_METHODS.GetEndDate(OfferDate, element.period);

                    if (partnersOfferDates.length > 0) {
                        //compare the dates; update start date and end date bases on compared values
                        let compareVal = UTILITY_METHODS.DateComparison(partnersOfferDates[updateAbleIndex].startdate, partnersOfferDates[updateAbleIndex].enddate, startDate);
                        LOGGER.INFO(fileName, methodName, `compareVal: ${compareVal} with startDate ${OfferDate}`);

                        if (compareVal == -1) {
                            if (partnerName != partnersOfferDates[updateAbleIndex].partnerName) {
                                partnersOfferDates[updateAbleIndex].partnerName = partnerName;
                                partnersOfferDates[updateAbleIndex].startdate = startDate;
                                partnersOfferDates[updateAbleIndex].enddate = OfferDate;
                            } else {
                                LOGGER.DEBUG(fileName, methodName, `Offer added startDate [${startDate}] for partner ${partnerName}`);
                                partnersOfferDates.push({ partnerName: partnerName, startdate: startDate, enddate: OfferDate });
                            }
                        } else if (compareVal == 0) {

                            if (OfferDate != null) {
                                compareVal = UTILITY_METHODS.DateComparison(partnersOfferDates[updateAbleIndex].startdate, partnersOfferDates[updateAbleIndex].enddate, OfferDate);

                                if (compareVal == 1) {
                                    if (partnerName != partnersOfferDates[updateAbleIndex].partnerName) {
                                        LOGGER.DEBUG(fileName, methodName, `Offer added startDate [${startDate}] for partner ${partnerName}`);
                                        partnersOfferDates.push({ partnerName: partnerName, startdate: startDate, enddate: OfferDate });
                                    } else {
                                        partnersOfferDates[updateAbleIndex].enddate = OfferDate;
                                    }
                                }
                            }
                        } else if (compareVal == 1) {
                            LOGGER.DEBUG(fileName, methodName, `Offer added startDate [${startDate}] for partner ${partnerName}`);
                            partnersOfferDates.push({ partnerName: partnerName, startdate: startDate, enddate: OfferDate });
                        }
                    } else {
                        LOGGER.DEBUG(fileName, methodName, `Offer added startDate [${startDate}] for partner ${partnerName}`);
                        partnersOfferDates.push({ partnerName: partnerName, startdate: startDate, enddate: OfferDate });
                    }

                }
            }, this);


        } catch (err) {
            LOGGER.ERROR(fileName, methodName, err.message);
        }

        //freeing the memory 
        updateAbleIndex = undefined;
        grantedOffers = undefined;
        methodName = undefined;

        return partnersOfferDates;
    }
}

module.exports = UTILITY_METHODS;