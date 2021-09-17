var request = require('request');

var options = {
  method: 'POST',
  url: 'https://mssnd4p8uj.execute-api.eu-west-1.amazonaws.com/dev/cost',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'MVoESp2MFEageJv4kSFBt8IqSVMl9yhI3dfLWz9L'
  },
  body: {
    orderIds: [10005, 5993724, 10006],
    pressSheetSize: { sizeIso: 'A1+', sizeInCm: '72x102' },
    sheetsCount: '23700'
  },
  json: true
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
