// 引入在store中定义的State初始数据和Action对应数据
import {ServiceGroupManagementState, ServiceGroupManagementAction} from '@/store/itsmSystem/serviceGroupManagement';
 
// 定义初始数据
const initialState: ServiceGroupManagementState = {
  loading: false,
  serviceGroupList: [],
  serviceGroupId: '',
  permission: [],
  selectRowsID: [],
  addGroupShow: false,
  addPermissionShow: false,
  selectPermission: [],
  selectedPermission: [],
};

// 定义reducer处理函数
export default function reducer(state: ServiceGroupManagementState | null | undefined = initialState, action: ServiceGroupManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 控制页面加载中状态
    case "change serviceGroupManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 服务组列表
    case "get serviceGroupManagement serviceGroupList": {
      return {
        ...state,
        serviceGroupList: action.serviceGroupList,
      };
    }

    // 服务组id
    case "get serviceGroupManagement serviceGroupId": {
      return {
        ...state,
        serviceGroupId: action.serviceGroupId
      };
    }

    // 服务组对应服务
    case "get serviceGroupManagement permission": {
      return {
        ...state,
        permission: action.permission
      };
    }

    // 当前选中服务id数组
    case "get serviceGroupManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 控制新建服务组显示隐藏
    case "change serviceGroupManagement addGroupShow": {
      return {
        ...state,
        addGroupShow: !state.addGroupShow
      };
    }

    // 控制新建服务显示隐藏
    case "change serviceGroupManagement addPermissionShow": {
      return {
        ...state,
        addPermissionShow: !state.addPermissionShow
      };
    }

    // 当前服务组可以添加的服务
    case "get serviceGroupManagement selectPermission": {
      return {
        ...state,
        selectPermission: action.selectPermission
      };
    }

    // 当前选中的可以添加的服务
    case "get serviceGroupManagement selectedPermission": {
      return {
        ...state,
        selectedPermission: action.selectedPermission
      };
    }

    default:
      return state;
  }
}
