// 引入在store中定义的State初始数据和Action对应数据
import {KnowledgeManagementState, KnowledgeManagementAction} from '@/store/itsmSystem/KnowledgeManagement';
 
// 定义初始数据
const initialState: KnowledgeManagementState = {
  categoryList: [],
  categoryCount: 0,
  categoryPage: 1,
  categoryLimit: 12,
  categorySearchVal: "",
  categoryLoading: false,
  categoryPerson: [],
  categoryPersonId: '',
  categoryEditShow: false,
  categoryEditType: '',
  categoryEditId: '',
  categoryEditForm: {},
  categoryDetailShow: false,
  categoryDetailId: '',
  categoryDetailForm: {},
  list: [],
  count: 0,
  page: 1,
  limit: 10,
  searchVal: "",
  loading: false,
  tabsKey: 0,
  selectRowsID: [],
  status: "",
  editType: '',
  editId: '',
  editForm: {},
  updateTimeSort: '',
  createTimeSort: '',
  detailId: '',
  detailMsg: {},
  categoryId: '',
};

// 定义reducer处理函数
export default function reducer(state: KnowledgeManagementState | null | undefined = initialState, action: KnowledgeManagementAction) {
  if (!state) {
    return null;
  }
  switch (action.type) {

    // 获取知识库分类列表
    case 'get knowledgeManagement categoryList': {
      return {
        ...state,
        categoryList: action.categoryList,
        categoryCount: action.categoryCount
      };
    }

    // 页数
    case 'change knowledgeManagement categoryPage': {
      return {
        ...state,
        categoryPage: action.categoryPage
      };
    }

    // 每页显示条数
    case 'change knowledgeManagement categoryLimit': {
      return {
        ...state,
        categoryLimit: action.categoryLimit
      };
    }

    // 搜索框值
    case "change knowledgeManagement categorySearchVal": {
      return {
        ...state,
        categorySearchVal: action.categorySearchVal
      };
    }

    // 控制知识库分类页面加载中状态
    case "change knowledgeManagement categoryLoading": {
      return {
        ...state,
        categoryLoading: !state.categoryLoading
      };
    }

    // 知识库人员列表
    case "get knowledgeManagement categoryPerson": {
      return {
        ...state,
        categoryPerson: action.categoryPerson
      };
    }

    // 选中的处理人员
    case "change knowledgeManagement categoryPersonId": {
      return {
        ...state,
        categoryPersonId: action.categoryPersonId
      };
    }

    // 控制知识库新建，编辑组件显示隐藏以及编辑还是新增type
    case "change knowledgeManagement categoryEditShow": {
      return {
        ...state,
        categoryEditShow: !state.categoryEditShow,
        categoryEditType: action.categoryEditType,
        categoryEditId: action.categoryEditId
      };
    }

    // 编辑知识库表单数据
    case "get knowledgeManagement categoryEditForm": {
      return {
        ...state,
        categoryEditForm: action.categoryEditForm,
      };
    }

    // 控制知识库详情显示隐藏
    case "change knowledgeManagement categoryDetailShow": {
      return {
        ...state,
        categoryDetailShow: !state.categoryDetailShow,
        categoryDetailId: action.categoryDetailId
      };
    }

    // 知识库详情组件表单数据
    case "get knowledgeManagement categoryDetailForm": {
      return {
        ...state,
        categoryDetailForm: action.categoryDetailForm,
      };
    }

    // 获取知识列表数据
    case 'get knowledgeManagement list': {
      return {
        ...state,
        list: action.list,
        count: action.count
      };
    }

    // 页数
    case 'change knowledgeManagement page': {
      return {
        ...state,
        page: action.page
      };
    }

    // 每页显示条数
    case 'change knowledgeManagement limit': {
      return {
        ...state,
        limit: action.limit
      };
    }

    // 搜索框值
    case "change knowledgeManagement searchVal": {
      return {
        ...state,
        searchVal: action.searchVal
      };
    }

    // 控制页面加载中状态
    case "change knowledgeManagement loading": {
      return {
        ...state,
        loading: !state.loading
      };
    }

    // 切换页面选项卡的key
    case "change knowledgeManagement tabsKey": {
      return {
        ...state,
        tabsKey: action.tabsKey
      };
    }

    // 选中的表格行的id集合数组
    case "get knowledgeManagement selectRowsID": {
      return {
        ...state,
        selectRowsID: action.selectRowsID
      };
    }

    // 选中的知识状态
    case "change knowledgeManagement status": {
      return {
        ...state,
        status: action.status
      };
    }

    // 控制知识新建，编辑组件显示隐藏以及编辑还是新增type
    case "change knowledgeManagement editShow": {
      return {
        ...state,
        editType: action.editType,
        editId: action.editId
      };
    }

    // 编辑知识表单数据
    case "get knowledgeManagement editForm": {
      return {
        ...state,
        editForm: action.editForm,
      };
    }

    // 控制知识列表根据更新时间排序
    case "change knowledgeManagement updateTimeSort": {
      return {
        ...state,
        updateTimeSort: action.updateTimeSort
      };
    }

    // 控制知识列表根据创建时间排序
    case "change knowledgeManagement createTimeSort": {
      return {
        ...state,
        createTimeSort: action.createTimeSort
      };
    }

    // 当前进入详情的知识id
    case "get knowledgeManagement detailId": {
      return {
        ...state,
        detailId: action.detailId
      };
    }

    // 当前进入详情的知识数据
    case "get knowledgeManagement detailMsg": {
      return {
        ...state,
        detailMsg: action.detailMsg
      };
    }

    // 传递知识库分类页面点击的分类id
    case "get knowledgeManagement categoryId": {
      return {
        ...state,
        categoryId: action.categoryId,
      };
    }
    default:
      return state;
  }
}
