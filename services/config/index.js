const debug = require('debug')('services:config');
const common = require('./env/common');

const env = process.env.NODE_ENV || 'development';

debug(`Load environment ${env} configuration`);

const config = require(`./env/${env}`);

module.exports = Object.assign({}, common, config);
