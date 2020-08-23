'use strict';

const { _getWordRandomc_ } = require('../lib/chart')

const write = () => {
    let chart = _getWordRandomc_(0);
    return 'generando... '+chart;
};

module.exports = {
    write,
};