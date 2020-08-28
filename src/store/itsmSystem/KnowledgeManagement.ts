// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface KnowledgeManagementState {
  categoryList: any[];
  categoryCount: number;
  categoryPage: number;
  categoryLimit: number;
  categorySearchVal: any;
  categoryLoading: boolean;
  categoryPerson: any[];
  categoryPersonId: any;
  categoryEditShow: boolean;
  categoryEditType: string;
  categoryEditId: any;
  categoryEditForm: any;
  categoryDetailShow: boolean;
  categoryDetailId: any;
  categoryDetailForm: any;
  list: any[];
  count: number;
  page: number;
  limit: number;
  searchVal: any;
  loading: boolean;
  tabsKey: number;
  selectRowsID: any[];
  status: any;
  editType: string;
  editId: any;
  editForm: any;
  updateTimeSort: string;
  createTimeSort: string;
  detailId: any;
  detailMsg: any;
  categoryId: any;
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type KnowledgeManagementAction =
  | {
  type: 'get knowledgeManagement categoryList';
  categoryList: any[];
  categoryCount: number;
} | {
  type: 'change knowledgeManagement categoryPage';
  categoryPage: number;
} | {
  type: 'change knowledgeManagement categoryLimit';
  categoryLimit: number;
} | {
  type: 'change knowledgeManagement categorySearchVal';
  categorySearchVal: any;
} | {
  type: 'change knowledgeManagement categoryLoading';
  categoryLoading: boolean;
} | {
  type: 'get knowledgeManagement categoryPerson';
  categoryPerson: any[];
} | {
  type: 'change knowledgeManagement categoryPersonId';
  categoryPersonId: any;
} | {
  type: 'change knowledgeManagement categoryEditShow';
  categoryEditShow: boolean;
  categoryEditType: string;
  categoryEditId: any;
} | {
  type: 'get knowledgeManagement categoryEditForm';
  categoryEditForm: any;
} | {
  type: 'change knowledgeManagement categoryDetailShow';
  categoryDetailShow: boolean;
  categoryDetailId: any;
} | {
  type: 'get knowledgeManagement categoryDetailForm';
  categoryDetailForm: any;
} | {
  type: 'get knowledgeManagement list';
  list: any[];
  count: number;
} | {
  type: 'change knowledgeManagement page';
  page: number;
} | {
  type: 'change knowledgeManagement limit';
  limit: number;
} | {
  type: 'change knowledgeManagement searchVal';
  searchVal: any;
} | {
  type: 'change knowledgeManagement loading';
  loading: boolean;
} | {
  type: 'change knowledgeManagement tabsKey';
  tabsKey: number;
} | {
  type: 'get knowledgeManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change knowledgeManagement status';
  status: any;
} | {
  type: 'change knowledgeManagement editShow';
  editType: string;
  editId: any;
} | {
  type: 'get knowledgeManagement editForm';
  editForm: any;
} | {
  type: 'change knowledgeManagement updateTimeSort';
  updateTimeSort: string;
} | {
  type: 'change knowledgeManagement createTimeSort';
  createTimeSort: string;
} | {
  type: 'get knowledgeManagement detailId';
  detailId: any;
} | {
  type: 'get knowledgeManagement detailMsg';
  detailMsg: any;
} | {
  type: 'get knowledgeManagement categoryId';
  categoryId: any;
}
