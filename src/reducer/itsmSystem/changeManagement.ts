// 引入在store中定义的State初始数据和Action对应数据
import {ChangeManagementState, ChangeManagementAction} from '@/store/itsmSystem/changeManagement';
 
// 定义初始数据
const initialState: ChangeManagementState = {
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
export default function reducer(state: ChangeManagementState | null | undefined = initialState, action: ChangeManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取变更列表数据
    case 'get changeManagement list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change changeManagement page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change changeManagement limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change changeManagement searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change changeManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 切换页面选项卡的key
    case "change changeManagement tabsKey": {
      return {
        ...state,
        tabsKey: action.tabsKey
      };
    }

    // 选中的表格行的id集合数组
    case "get changeManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 选中的变更等级
    case "change changeManagement level": {
      return {
        ...state,
        level: action.level
      };
    }

    // 选中的变更状态
    case "change changeManagement status": {
      return {
        ...state,
        status: action.status
      };
    }

    // 变更分类列表
    case "get changeManagement category": {
      return {
        ...state,
        category: action.category
      };
    }

    // 选中的变更分类
    case "change changeManagement categoryId": {
      return {
        ...state,
        categoryId: action.categoryId
      };
    }

    // 搜索人员列表
    case "get changeManagement person": {
      return {
        ...state,
        person: action.person
      };
    }

    // 选中的搜索人员
    case "change changeManagement personId": {
      return {
        ...state,
        personId: action.personId
      };
    }

    // 处理人员列表
    case "get changeManagement handlePerson": {
      return {
        ...state,
        handlePerson: action.handlePerson
      };
    }

    // 控制变更分类设置组件显示隐藏
    case "change changeManagement categorySetShow": {
      return {
        ...state,
        categorySetShow: !state.categorySetShow
      };
    }

    // 控制变更新建，编辑组件显示隐藏以及编辑还是新增type
    case "change changeManagement editShow": {
      return {
        ...state,
        editShow: !state.editShow,
        editType: action.editType,
        editId: action.editId
      };
    }

    // 编辑变更表单数据
    case "get changeManagement editForm": {
      return {
        ...state,
        editForm: action.editForm,
      };
    }

    // 控制变更列表根据等级排序
    case "change changeManagement levelSort": {
      return {
        ...state,
        levelSort: action.levelSort
      };
    }

    // 控制变更列表根据创建时间排序
    case "change changeManagement createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 当前进入详情的变更id
    case "get changeManagement detailId": {
      return {
        ...state,
        detailId: action.detailId
      };
    }

    // 当前进入详情的变更数据
    case "get changeManagement detailMsg": {
      return {
        ...state,
        detailMsg: action.detailMsg
      };
    }

    // 当前关闭的变更id
    case "change changeManagement closeShow": {
      return {
        ...state,
        closeShow: !state.closeShow,
        closeId: action.closeId
      };
    }

    // 控制评审变更表单组件显示隐藏
    case "change changeManagement reviewShow": {
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
