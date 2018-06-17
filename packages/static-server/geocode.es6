const camelCase = require('lodash/camelCase');
const maps = require('@google/maps');
const cache = require('./cache');

const geocode = key => {
  const googleMapsClient = maps.createClient({
    key
  });
  const func = address =>
    new Promise((yay, nay) => {
      googleMapsClient.geocode(
        {
          address
        },
        (err, response) => {
          if (err) {
            nay(err);
          }

          if (!response.json.results[0]) {
            nay('No obj found');
          } else {
            const result = response.json.results[0];
            const obj = {
              formatted: result.formatted_address,
              lat: result.geometry.location.lat,
              lng: result.geometry.location.lng,
              placeId: result.place_id
            };
            result.address_components.forEach(item => {
              obj[camelCase(item.types[0])] = item.long_name;
            });
            cache[address] = obj;
            yay(obj);
          }
        }
      );
    });
  if (process.env.NODE_ENV === 'development') {
    return cache(func, 'geocode');
  }
  return func;
};

module.exports = geocode;
