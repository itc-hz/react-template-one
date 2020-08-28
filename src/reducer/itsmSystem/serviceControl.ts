// 引入在store中定义的State初始数据和Action对应数据
import {ServiceControlState, ServiceControlAction} from '@/store/itsmSystem/serviceControl';
 
// 定义初始数据
const initialState: ServiceControlState = {
  list: [],
  count: 0,
  page: 1,
  limit: 10,
  searchVal: "",
  loading: false,
  listLoading: false,
  moduleId: '',
  consoleData: {},
  levelSort: '',
  createTimeSort: '',
  formControl: false,
  backModuleId: '',
  backSearchVal: '',
  showList: false,
};

// 定义reducer处理函数
export default function reducer(state: ServiceControlState | null | undefined = initialState, action: ServiceControlAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取指定服务列表数据
    case 'get serviceControl list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change serviceControl page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change serviceControl limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change serviceControl searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change serviceControl loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 控制页面加载中状态
    case "change serviceControl listLoading": {
      return {
        ...state,
        listLoading: !state.listLoading
      };
    }

    // 选中的服务分类id
    case "change serviceControl moduleId": {
      return {
        ...state,
        moduleId: action.moduleId
      };
    }

    // 控制台统计数据
    case "get serviceControl consoleData": {
      return {
        ...state,
        consoleData: action.consoleData
      };
    }

    // 控制数据列表根据等级排序
    case "change serviceControl levelSort": {
      return {
        ...state,
        levelSort: action.levelSort
      };
    }

    // 控制数据列表根据创建时间排序
    case "change serviceControl createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 判断当前是否是从服务控制台跳转至详情页面的,保存跳转前的数据
    case "change serviceControl formControl": {
      return {
        ...state,
        formControl: action.formControl,
        backModuleId: action.backModuleId,
        backSearchVal: action.backSearchVal,
      };
    }

    // 控制列表数据显示隐藏
    case "change serviceControl showList": {
      return {
        ...state,
        showList: action.showList
      };
    }

    default:
      return state;
  }
}
