var request = require('request');
var rp = require('request-promise');

var options = {
  method: 'POST',
  url: process.env.URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  },
  body: {
    orderIds: [10005, 5993724, 10006],
    pressSheetSize: { sizeIso: 'A1+', sizeInCm: '72x102' },
    sheetsCount: '23700'
  },
  json: true
};

const AB = async function() {
  //return rp(options);
  return new Promise(function(resolve, reject) {
    request(options, function(err, response, parsedBody) {
      if (err !== null) return reject(err);
      let fulfilmentData = [];

      for (let i = 0; i < parsedBody.length; i++) {
        let costShip = 0,
          orders = [];
        let costTotal =
          parsedBody[i].costReview +
          parsedBody[i].costGanging +
          costShip +
          parsedBody[i].costMfg;

        let orderObject = {
          orderId: parsedBody[i].orderId,
          currency: parsedBody[i].currency,
          costReview: parsedBody[i].costReview,
          costGanging: parsedBody[i].costGanging,
          costShip: costShip,
          costMfg: parsedBody[i].costMfg,
          costTotal: costTotal
        };

        let existingAtelier = fulfilmentData.filter(
          x => x.atelierId === parsedBody[i].atelierid
        );

        if (existingAtelier.length > 0) {
          let prevOrders = existingAtelier[0].orders;
          prevOrders.push(orderObject);
          existingAtelier[0].orders = prevOrders;

          let prevTotalCost = existingAtelier[0].totalCost;
          prevTotalCost.costReview =
            prevTotalCost.costReview + parsedBody[i].costReview;
          prevTotalCost.costGanging =
            prevTotalCost.costGanging + parsedBody[i].costGanging;
          prevTotalCost.costShip = prevTotalCost.costShip + costShip;
          prevTotalCost.costMfg = prevTotalCost.costMfg + parsedBody[i].costMfg;
          prevTotalCost.costTotal = prevTotalCost.costTotal + costTotal;
        } else {
          let totalCostObject = {
            currency: parsedBody[i].currency,
            costReview: parsedBody[i].costReview,
            costGanging: parsedBody[i].costGanging,
            costShip: costShip,
            costMfg: parsedBody[i].costMfg,
            costTotal: costTotal
          };

          let fulfilmentObject = {
            atelierId: parsedBody[i].atelierid,
            orders: [orderObject],
            totalCost: totalCostObject
          };

          fulfilmentData.push(fulfilmentObject);
        }
      }

      let finalCostResp = { fulfilmentData: fulfilmentData };
      return resolve(finalCostResp);
    });
  });
};

module.exports = AB;
