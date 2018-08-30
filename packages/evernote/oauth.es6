import Evernote from 'evernote';

export default ({
  consumerKey,
  consumerSecret,
  sandbox = false,
  china = false,
  callback
}) => {
  const client = new Evernote.Client({
    consumerKey,
    consumerSecret,
    sandbox,
    china
  });

  const api = {
    getAccessToken: (token, verifier, secret) =>
      new Promise((yay, nay) =>
        client.getAccessToken(
          token,
          secret,
          verifier,
          (error, oauthAccessToken) => {
            if (error) {
              return nay(error.data);
            }
            yay(oauthAccessToken);
          }
        )
      ),
    getRequestToken: callbackUrl =>
      new Promise((yay, nay) =>
        client.getRequestToken(callbackUrl, (err, oauthToken, oauthSecret) => {
          if (err) {
            nay(err);
          } else {
            return yay({
              url: client.getAuthorizeUrl(oauthToken),
              secret: oauthSecret
            });
          }
        })
      ),
    lambdaLogin: async (event, context, callback) => {
      const { queryStringParameters } = event;
      return client.getAccessToken(
        queryStringParameters.oauth_token,
        global.secret || queryStringParameters.secret,
        queryStringParameters.oauth_verifier,
        (error, oauthAccessToken) => {
          if (error) {
            console.log(error);
            return callback(null, {
              statusCode: error.statusCode,
              headers: {
                'Content-Type': 'text/html'
              },
              body: error.data
            });
          }
          // const user = oauthAccessToken.split('A=')[1].split(':V')[0];
          // const token = oauthAccessToken;
          return callback(null, {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html'
            },
            body: `${oauthAccessToken}`
          });
        }
      );
    },
    lambdaFinal: async (event, context, cb) => {
      const { headers, path } = event;
      const callbackUrl = `http://${headers.host}${callback || path}`;
      client.getRequestToken(callbackUrl, (err, oauthToken, oauthSecret) => {
        if (err) {
          console.log(err);
        } else {
          global.secret = oauthSecret;
          const authorizeUrl = client.getAuthorizeUrl(oauthToken);
          return cb(null, {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html'
            },
            body: `Please <a href="${authorizeUrl}" target="_blank">click here</a> to authorize the application (${oauthSecret})`
          });
        }
      });
    }
  };
  return api;
};
