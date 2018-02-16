const debug = require('debug')('services:config');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

debug(`Load environment ${env} configuration`);

module.exports = require(`./${env}/`);
