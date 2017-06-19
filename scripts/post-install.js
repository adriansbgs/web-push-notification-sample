/**
 *
 */

const fs = require('fs');
const dest = 'application-server-keys.json';

if (fs.existsSync(dest)) {
  return console.log('[post-install:ABORT] server-keys already exits.');
}

const webpush = require('web-push');
const {publicKey, privateKey} = webpush.generateVAPIDKeys();
// VAPID is a pair of public key and private key for "Web Push Protocol".
// Visit https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/web-push-protocol
// for more information.

fs.writeFileSync(dest, JSON.stringify({publicKey, privateKey}, null, 2));

const embed = `
// {{{ AUTO GENERATED BY "./scripts/post-install.js"
var applicationServerPublicKey = "${publicKey}";
// }}}
`;
fs.appendFileSync('./main.js', embed);

return console.log('[post-install:DONE] server-keys for your project is created.');
