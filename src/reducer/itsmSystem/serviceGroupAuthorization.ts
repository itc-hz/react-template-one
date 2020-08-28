// 引入在store中定义的State初始数据和Action对应数据
import {ServiceGroupAuthorizationState, ServiceGroupAuthorizationAction} from '@/store/itsmSystem/serviceGroupAuthorization';
 
// 定义初始数据
const initialState: ServiceGroupAuthorizationState = {
  loading: false,
  serviceGroupList: [],
  serviceGroupId: '',
  selectRowsID: [],
  personnel: [],
  addPersonnelShow: false,
  selectPersonnel: [],
};

// 定义reducer处理函数
export default function reducer(state: ServiceGroupAuthorizationState | null | undefined = initialState, action: ServiceGroupAuthorizationAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 控制页面加载中状态
    case "change serviceGroupAuthorization loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 服务组列表
    case "get serviceGroupAuthorization serviceGroupList": {
      return {
        ...state,
        serviceGroupList: action.serviceGroupList,
      };
    }

    // 服务组id
    case "get serviceGroupAuthorization serviceGroupId": {
      return {
        ...state,
        serviceGroupId: action.serviceGroupId
      };
    }

    // 当前选中服务id数组
    case "get serviceGroupAuthorization selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 当前服务组的人员数据
    case "get serviceGroupAuthorization personnel": {
      return {
        ...state,
        personnel: action.personnel
      };
    }

    // 控制新建服务显示隐藏
    case "change serviceGroupAuthorization addPersonnelShow": {
      return {
        ...state,
        addPersonnelShow: !state.addPersonnelShow
      };
    }

    // 当前服务组可以添加的人员
    case "get serviceGroupAuthorization selectPersonnel": {
      return {
        ...state,
        selectPersonnel: action.selectPersonnel
      };
    }

    default:
      return state;
  }
}
