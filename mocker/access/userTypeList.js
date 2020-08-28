// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
const moment = require('moment');
const userTypeList = Mock.mock({
    'data|30': [{
        'id|+1': 0,
        'name': '@cword(8)',
        'updateTime': '@datetime()'
    }]
});

const dataList = userTypeList.data;

function getUserTypeList() {
    return (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const search = req.query.search || undefined;
        let data = dataList;
        if(search) {
            data = data.filter(item => {
                return item.name.indexOf(search) !== -1;
            });
        }
        const list = data.slice((page - 1) * limit, page * limit);
        return res.json({
            list: list,
            page: page,
            limit: limit,
            total: data.length
        });
    };
}

function getUserTypeById() {
    return (req, res) => {
        const id = req.query.id.trim();
        let data;
        dataList.forEach(item=>{
           if(item.id == id) {
               data = item;
           }
        });

        return res.json(data);
    };
}

function putUserTypeById() {
    return (req, res) => {
        const {id, name} = req.body;
       dataList.forEach(item=>{
          if(item.id == id) {
              item.name = name;
              item.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          }
       });
       return res.json({
           message: '修改成功',
           code: 0
       });
    };
}

module.exports = {
    getUserTypeList,
    getUserTypeById,
    putUserTypeById
};
