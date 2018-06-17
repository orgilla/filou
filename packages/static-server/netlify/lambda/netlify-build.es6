const axios = require('axios');

exports.handler = function(event, context, callback) {
  axios
    .post(
      'https://api.netlify.com/build_hooks/5b1681ca1f12b747e7ebf904',
      event.body
    )
    .then(x =>
      callback(null, {
        statusCode: 200
      })
    )
    .catch(err =>
      callback('error', {
        statusCode: 500
      })
    );
};
