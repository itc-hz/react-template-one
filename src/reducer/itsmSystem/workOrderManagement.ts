// 引入在store中定义的State初始数据和Action对应数据
import {WorkOrderManagementState, WorkOrderManagementAction} from '@/store/itsmSystem/workOrderManagement';
 
// 定义初始数据
const initialState: WorkOrderManagementState = {
  list: [],
  count: 0,
  page: 1,
  limit: 10,
  searchVal: "",
  loading: false,
  tabsKey: '0',
  selectRowsID: [],
  level: "",
  status: undefined,
  category: [],
  categoryId: "",
  person: [],
  personId: '',
  handlePerson: [],
  categorySetShow: false,
  editShow: false,
  editType: '',
  editId: '',
  editForm: {},
  levelSort: '',
  createTimeSort: '',
  detailId: '',
  detailMsg: {},
  closeId: '',
  closeShow: false,
  reviewShow: false,
  reviewId: '',
  reviewType: '',
};

// 定义reducer处理函数
export default function reducer(state: WorkOrderManagementState | null | undefined = initialState, action: WorkOrderManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取工单列表数据
    case 'get workOrderManagement list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change workOrderManagement page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change workOrderManagement limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change workOrderManagement searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change workOrderManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 切换页面选项卡的key
    case "change workOrderManagement tabsKey": {
      return {
        ...state,
        tabsKey: action.tabsKey
      };
    }

    // 选中的表格行的id集合数组
    case "get workOrderManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 选中的工单等级
    case "change workOrderManagement level": {
      return {
        ...state,
        level: action.level
      };
    }

    // 选中的工单状态
    case "change workOrderManagement status": {
      return {
        ...state,
        status: action.status
      };
    }

    // 工单分类列表
    case "get workOrderManagement category": {
      return {
        ...state,
        category: action.category
      };
    }

    // 选中的工单分类
    case "change workOrderManagement categoryId": {
      return {
        ...state,
        categoryId: action.categoryId
      };
    }

    // 搜索人员列表
    case "get workOrderManagement person": {
      return {
        ...state,
        person: action.person
      };
    }

    // 选中的搜索人员
    case "change workOrderManagement personId": {
      return {
        ...state,
        personId: action.personId
      };
    }

    // 处理人员列表
    case "get workOrderManagement handlePerson": {
      return {
        ...state,
        handlePerson: action.handlePerson
      };
    }

    // 控制工单分类设置组件显示隐藏
    case "change workOrderManagement categorySetShow": {
      return {
        ...state,
        categorySetShow: !state.categorySetShow
      };
    }

    // 控制工单新建，编辑组件显示隐藏以及编辑还是新增type
    case "change workOrderManagement editShow": {
      return {
        ...state,
        editShow: !state.editShow,
        editType: action.editType,
        editId: action.editId
      };
    }

    // 编辑工单表单数据
    case "get workOrderManagement editForm": {
      return {
        ...state,
        editForm: action.editForm,
      };
    }

    // 控制工单列表根据等级排序
    case "change workOrderManagement levelSort": {
      return {
        ...state,
        levelSort: action.levelSort
      };
    }

    // 控制工单列表根据创建时间排序
    case "change workOrderManagement createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 当前进入详情的工单id
    case "get workOrderManagement detailId": {
      return {
        ...state,
        detailId: action.detailId
      };
    }

    // 当前进入详情的工单数据
    case "get workOrderManagement detailMsg": {
      return {
        ...state,
        detailMsg: action.detailMsg
      };
    }

    // 当前关闭的工单id
    case "change workOrderManagement closeShow": {
      return {
        ...state,
        closeShow: !state.closeShow,
        closeId: action.closeId
      };
    }

    // 控制评审工单表单组件显示隐藏
    case "change workOrderManagement reviewShow": {
      return {
        ...state,
        reviewShow: !state.reviewShow,
        reviewId: action.reviewId,
        reviewType: action.reviewType,
      };
    }
    default:
      return state;
  }
}
