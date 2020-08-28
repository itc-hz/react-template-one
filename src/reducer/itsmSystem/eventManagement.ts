// 引入在store中定义的State初始数据和Action对应数据
import {EventManagementState, EventManagementAction} from '@/store/itsmSystem/eventManagement';
 
// 定义初始数据
const initialState: EventManagementState = {
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
  reviewForm: {},
  workOrderCategory: [],
  workOrderPerson: [],
};

// 定义reducer处理函数
export default function reducer(state: EventManagementState | null | undefined = initialState, action: EventManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取问题列表数据
    case 'get eventManagement list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change eventManagement page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change eventManagement limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change eventManagement searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change eventManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 切换页面选项卡的key
    case "change eventManagement tabsKey": {
      return {
        ...state,
        tabsKey: action.tabsKey
      };
    }

    // 选中的表格行的id集合数组
    case "get eventManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 选中的问题等级
    case "change eventManagement level": {
      return {
        ...state,
        level: action.level
      };
    }

    // 选中的问题状态
    case "change eventManagement status": {
      return {
        ...state,
        status: action.status
      };
    }

    // 问题分类列表
    case "get eventManagement category": {
      return {
        ...state,
        category: action.category
      };
    }

    // 选中的问题分类
    case "change eventManagement categoryId": {
      return {
        ...state,
        categoryId: action.categoryId
      };
    }

    // 搜索人员列表
    case "get eventManagement person": {
      return {
        ...state,
        person: action.person
      };
    }

    // 选中的搜索人员
    case "change eventManagement personId": {
      return {
        ...state,
        personId: action.personId
      };
    }

    // 处理人员列表
    case "get eventManagement handlePerson": {
      return {
        ...state,
        handlePerson: action.handlePerson
      };
    }

    // 控制问题分类设置组件显示隐藏
    case "change eventManagement categorySetShow": {
      return {
        ...state,
        categorySetShow: !state.categorySetShow
      };
    }

    // 控制问题新建，编辑组件显示隐藏以及编辑还是新增type
    case "change eventManagement editShow": {
      return {
        ...state,
        editShow: !state.editShow,
        editType: action.editType,
        editId: action.editId
      };
    }

    // 编辑问题表单数据
    case "get eventManagement editForm": {
      return {
        ...state,
        editForm: action.editForm,
      };
    }

    // 控制问题列表根据等级排序
    case "change eventManagement levelSort": {
      return {
        ...state,
        levelSort: action.levelSort
      };
    }

    // 控制问题列表根据创建时间排序
    case "change eventManagement createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 当前进入详情的问题id
    case "get eventManagement detailId": {
      return {
        ...state,
        detailId: action.detailId
      };
    }

    // 当前进入详情的问题数据
    case "get eventManagement detailMsg": {
      return {
        ...state,
        detailMsg: action.detailMsg
      };
    }

    // 当前关闭的问题id
    case "change eventManagement closeShow": {
      return {
        ...state,
        closeShow: !state.closeShow,
        closeId: action.closeId
      };
    }

    // 控制评审问题表单组件显示隐藏
    case "change eventManagement reviewShow": {
      return {
        ...state,
        reviewShow: !state.reviewShow,
        reviewId: action.reviewId
      };
    }

    // 评审问题表单数据
    case "get eventManagement reviewForm": {
      return {
        ...state,
        reviewForm: action.reviewForm,
      };
    }

    // 获取事件分类列表
    case "get eventManagement workOrderCategory": {
      return {
        ...state,
        workOrderCategory: action.workOrderCategory,
      };
    }

    // 获取问题评审通过抄送事件人员数据
    case "get eventManagement workOrderPerson": {
      return {
        ...state,
        workOrderPerson: action.workOrderPerson,
      };
    }
    default:
      return state;
  }
}
