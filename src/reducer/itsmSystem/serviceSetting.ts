// 引入在store中定义的State初始数据和Action对应数据
import {ServiceSettingState, ServiceSettingAction} from '@/store/itsmSystem/serviceSetting';
 
// 定义初始数据
const initialState: ServiceSettingState = {
  loading: false,
  moduleList: [],
  moduleId: '',
  setMsg: {},
  personnel: [],
};

// 定义reducer处理函数
export default function reducer(state: ServiceSettingState | null | undefined = initialState, action: ServiceSettingAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 控制页面加载中状态
    case "change serviceSetting loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 服务列表
    case "get serviceSetting moduleList": {
      return {
        ...state,
        moduleList: action.moduleList,
      };
    }

    // 服务id
    case "get serviceSetting moduleId": {
      return {
        ...state,
        moduleId: action.moduleId
      };
    }

    // 服务对应配置数据
    case "get serviceSetting setMsg": {
      return {
        ...state,
        setMsg: action.setMsg
      };
    }

    // 服务对应配置数据
    case "get serviceSetting personnel": {
      return {
        ...state,
        personnel: action.personnel
      };
    }
    default:
      return state;
  }
}
