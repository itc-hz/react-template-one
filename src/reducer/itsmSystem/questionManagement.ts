// 引入在store中定义的State初始数据和Action对应数据
import {QuestionManagementState, QuestionManagementAction} from '@/store/itsmSystem/questionManagement';
 
// 定义初始数据
const initialState: QuestionManagementState = {
  list: [],
  count: 0,
  page: 1,
  limit: 10,
  searchVal: "",
  loading: false,
  tabsKey: '0',
  selectRowsID: [],
  level: "",
  status: "",
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
  eventCategory: [],
  eventPerson: [],
};

// 定义reducer处理函数
export default function reducer(state: QuestionManagementState | null | undefined = initialState, action: QuestionManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取问题列表数据
    case 'get questionManagement list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change questionManagement page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change questionManagement limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change questionManagement searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change questionManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 切换页面选项卡的key
    case "change questionManagement tabsKey": {
      return {
        ...state,
        tabsKey: action.tabsKey
      };
    }

    // 选中的表格行的id集合数组
    case "get questionManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 选中的问题等级
    case "change questionManagement level": {
      return {
        ...state,
        level: action.level
      };
    }

    // 选中的问题状态
    case "change questionManagement status": {
      return {
        ...state,
        status: action.status
      };
    }

    // 问题分类列表
    case "get questionManagement category": {
      return {
        ...state,
        category: action.category
      };
    }

    // 选中的问题分类
    case "change questionManagement categoryId": {
      return {
        ...state,
        categoryId: action.categoryId
      };
    }

    // 搜索人员列表
    case "get questionManagement person": {
      return {
        ...state,
        person: action.person
      };
    }

    // 处理人员列表
    case "get questionManagement handlePerson": {
      return {
        ...state,
        handlePerson: action.handlePerson
      };
    }

    // 选中的搜索人员
    case "change questionManagement personId": {
      return {
        ...state,
        personId: action.personId
      };
    }

    // 控制问题分类设置组件显示隐藏
    case "change questionManagement categorySetShow": {
      return {
        ...state,
        categorySetShow: !state.categorySetShow
      };
    }

    // 控制问题新建，编辑组件显示隐藏以及编辑还是新增type
    case "change questionManagement editShow": {
      return {
        ...state,
        editShow: !state.editShow,
        editType: action.editType,
        editId: action.editId
      };
    }

    // 编辑问题表单数据
    case "get questionManagement editForm": {
      return {
        ...state,
        editForm: action.editForm,
      };
    }

    // 控制问题列表根据等级排序
    case "change questionManagement levelSort": {
      return {
        ...state,
        levelSort: action.levelSort
      };
    }

    // 控制问题列表根据创建时间排序
    case "change questionManagement createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 当前进入详情的问题id
    case "get questionManagement detailId": {
      return {
        ...state,
        detailId: action.detailId
      };
    }

    // 当前进入详情的问题数据
    case "get questionManagement detailMsg": {
      return {
        ...state,
        detailMsg: action.detailMsg
      };
    }

    // 当前关闭的问题id
    case "change questionManagement closeShow": {
      return {
        ...state,
        closeShow: !state.closeShow,
        closeId: action.closeId
      };
    }

    // 控制评审问题表单组件显示隐藏
    case "change questionManagement reviewShow": {
      return {
        ...state,
        reviewShow: !state.reviewShow,
        reviewId: action.reviewId
      };
    }

    // 评审问题表单数据
    case "get questionManagement reviewForm": {
      return {
        ...state,
        reviewForm: action.reviewForm,
      };
    }

    // 获取问题分类列表
    case "get questionManagement eventCategory": {
      return {
        ...state,
        eventCategory: action.eventCategory,
      };
    }

    // 获取问题评审通过抄送问题人员数据
    case "get questionManagement eventPerson": {
      return {
        ...state,
        eventPerson: action.eventPerson,
      };
    }
    default:
      return state;
  }
}
