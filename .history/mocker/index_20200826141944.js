const dataAddress = require('./data/address');
const dataRoom = require('./data/roomlist');
const dataMeeting = require('./data/meetinglist');
const dataMeetingTmp = require('./data/meetingtemp');
const dataUserList = require('./data/userTreeList');
const dataMeetingDetail = require('./data/meetingDetail');
const dataAddressList = require('./data/addresslist');
const dataMeetingStatic = require('./data/meetingstatic');
const dataVoteList = require('./vote/votelist');
const userTypeList = require('./access/userTypeList');
const accessGroup = require('./access/group');
const passRecord = require('./access/passRecord');
const passRecordByRoom = require('./access/passRecordByRoom');
const logistic = require('./logistic/logisticList');
const goodsList = require('./logistic/goodsList');

function addressFun() {
    return (req, res) => {
        const data = dataAddress;
        const json = JSON.parse(data);
        return res.json(json);
    };
}

function roomFun() {
    return (req, res) => {
        const { addressId, date } = req.query;
        if(addressId) {
            const json = JSON.parse(dataRoom);
            const data = json.filter((item)=>{
                if(item.addressId == addressId) {
                    return item;
                }
            });

            return res.json(data);
        }
            const data = dataRoom;
            const json = JSON.parse(data);
            return res.json(json);

    };
}

function meetingFun() {
    return (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        const data = dataMeeting.slice((page - 1) * limit, page * limit);
        return res.json({
            list: data,
            page: page,
            total: dataMeeting.length
        });
    };
}

function meetingTempFun() {
    return (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        const data = dataMeetingTmp.slice((page - 1) * limit, page * limit);
        return res.json({
            list: data,
            page: page,
            total: dataMeeting.length
        });
    };
}
function userListFun() {
    return (req, res) => {
        return res.json(dataUserList);
    };
}

function userItemFun() {
    return (req, res) => {
        return res.json(dataMeetingDetail);
    };
}
function addressListFun() {
    return (req, res) => {
        return res.json(dataAddressList);
    };
}

function meetingStaticFun() {
    return (req, res) => {
        const type = req.query.type || 'week';
        return res.json(dataMeetingStatic[type]);
    };
}

function VoteListFun() {
    return (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 6;
        const data = dataVoteList.slice((page - 1) * limit, page * limit);
        const dataJson = {
            page: page,
            limit: limit,
            total: dataVoteList.length,
            list: data
        };
        return res.json(dataJson);
    };
}

const proxy = {
    'GET /api/v1.0/addressList': addressFun(),
    'GET /api/v1.0/roomList': roomFun(),
    'GET /api/v1.0/meetingList': meetingFun(),
    'GET /api/v1.0/meetingTemp': meetingTempFun(),
    'GET /api/v1.0/userList': userListFun(),
    'GET /api/v1.0/meetingItem': userItemFun(),
    'GET /api/v1.0/meetingRoomList': addressListFun(),
    'GET /api/v1.0/meetingStatistic': meetingStaticFun(),
    'GET /api/v1.0/votelist': VoteListFun(),
    'GET /api/v1.0/access/userTypeList': userTypeList.getUserTypeList(),
    'GET /api/v1.0/access/userType': userTypeList.getUserTypeById(),
    'PUT /api/v1.0/access/userType': userTypeList.putUserTypeById(),
    'GET /api/v1.0/access/groupList': accessGroup.getAccessGroupList(),
    'GET /api/v1.0/access/passRecord': passRecord.getPassRecordList(),
    'GET /api/v1.0/access/passRecordByRoom': passRecordByRoom.getPassRecordByRoom(),
    'GET /api/v1.0/access/passStatisticByRoom': passRecordByRoom.getPassStatisticByRoom(),
    'GET /api/v1.0/logistic/list': logistic.getLogisticList(),
    'GET /api/v1.0/logistic/goodstype': goodsList.getGoodsType(),
    'GET /api/v1.0/logistic/goodslist': goodsList.getGoodsList()
};

module.exports = proxy;
