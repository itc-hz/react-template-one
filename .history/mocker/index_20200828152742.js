
const userTypeList = require('./access/userTypeList');

const proxy = {
    'GET /api/v1.0/access/userTypeList': userTypeList.getUserTypeList()
};

module.exports = proxy;
