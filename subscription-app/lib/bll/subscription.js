const fileName = 'subscription.js';

const SUBSCRIPTION = {
    //params => single user's data
    //response => object with property of username and values of partners subscription in days
    GetSubscription: (userData, UTILITY_METHODS, PARTNERS, LOGGER) => {
        let partnersIndex = 0,
            partnersOfferDates = [],
            usersOffers = {},
            methodName = 'GetSubscription';

        try {
            //loop through all the PARTNERS
            PARTNERS.GetPartners().forEach(function(partnerName) {
                LOGGER.INFO(fileName, methodName, `Getting OffersDates for partner:${partnerName}`);
                //get object based on partner_name
                partnersOfferDates = UTILITY_METHODS.GetOffersDates(userData.number, partnersIndex,
                    partnersOfferDates, PARTNERS.GetPartnerData(partnerName), partnerName, LOGGER);

                partnersIndex++;
            }, this);

            //loop through all the dates to revoked the Offers
            partnersOfferDates.forEach(function(partnerData) {
                //get revokedOffers for a single account
                let revokedOffers = PARTNERS.GetPartnerData(partnerData.partnerName).revocations.filter(function(val) {
                    return val.number == userData.number;
                });

                revokedOffers.forEach(function(element) {
                    let revokeDate = new Date(element.date);
                    if (revokeDate != "Invalid Date") {
                        //compare the dates; update start date and end date bases on compared values
                        var compareVal = UTILITY_METHODS.DateComparison(partnerData.startdate, partnerData.enddate, revokeDate);
                        //if revokeDate falls in between then update the enddate
                        if (compareVal == 0) {
                            LOGGER.DEBUG(fileName, methodName, `revokeDate [${revokeDate}] falls in between offers`);
                            partnerData.enddate = revokeDate;
                        }
                    }
                }, this);

            }, this);

            //loop through all the dates to get subscription days           
            partnersOfferDates.forEach(function(partnerData) {
                var diffDays = 0;
                if (partnerData.enddate != null) {
                    //getting difference between dates in days
                    var timeDiff = Math.abs(partnerData.startdate.getTime() - partnerData.enddate.getTime());
                    diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
                }
                if (diffDays > 0) {
                    if (usersOffers[partnerData.partnerName] != null) {
                        diffDays = usersOffers[partnerData.partnerName] + diffDays;
                    }
                    usersOffers[partnerData.partnerName] = diffDays;
                }

            }, this);

        } catch (err) {
            LOGGER.ERROR(fileName, methodName, err.message);
        }

        //freeing the memory
        partnersIndex = undefined;
        partnersOfferDates = undefined;
        methodName = undefined;

        if (Object.keys(usersOffers).length === 0) {
            return false;
        } else {
            return {
                [userData.name]: usersOffers
            };
        }
    }
}

module.exports = SUBSCRIPTION;