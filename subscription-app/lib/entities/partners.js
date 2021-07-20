const fs = require('fs');

const PARTNERS = {
    GetPartners: () => {
        let partners = [];
        /*every partners data should be in a separate folder 
		so that easily indentify that the file belongs to a partner*/
        fs.readdirSync('../data/partners').forEach(file => {
            partners.push(file.replace('.json', ''));
        });
        return partners;
    },
    GetPartnerData: (partnerName) => {
        return require('../../data/partners/' + partnerName);
    }
}

module.exports = PARTNERS;