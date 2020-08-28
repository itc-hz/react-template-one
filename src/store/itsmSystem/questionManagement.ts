// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface QuestionManagementState {
  list: any[];
  count: number;
  page: number;
  limit: number;
  searchVal: any;
  loading: boolean;
  tabsKey: string;
  selectRowsID: any[];
  level: any;
  status: any;
  category: any[];
  categoryId: any;
  person: any[];
  personId: any;
  handlePerson: any[];
  categorySetShow: boolean;
  editShow: boolean;
  editType: string;
  editId: any;
  editForm: any;
  levelSort: string;
  createTimeSort: string;
  detailId: any;
  detailMsg: any;
  closeId: any;
  closeShow: boolean;
  reviewShow: boolean;
  reviewId: any;
  reviewForm: any;
  eventCategory: any[];
  eventPerson: any[];
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type QuestionManagementAction =
  | {
  type: 'get questionManagement list';
  list: any[];
  count: number;
} | {
  type: 'change questionManagement page';
  page: number;
} | {
  type: 'change questionManagement limit';
  limit: number;
} | {
  type: 'change questionManagement searchVal';
  searchVal: any;
} | {
  type: 'change questionManagement loading';
  loading: boolean;
} | {
  type: 'change questionManagement tabsKey';
  tabsKey: string;
} | {
  type: 'get questionManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change questionManagement level';
  level: any;
} | {
  type: 'change questionManagement status';
  status: any;
} | {
  type: 'get questionManagement category';
  category: any[];
} | {
  type: 'change questionManagement categoryId';
  categoryId: any;
} | {
  type: 'get questionManagement person';
  person: any[];
} | {
  type: 'change questionManagement personId';
  personId: any;
} | {
  type: 'get questionManagement handlePerson';
  handlePerson: any[];
} | {
  type: 'change questionManagement categorySetShow';
  categorySetShow: boolean;
} | {
  type: 'change questionManagement editShow';
  editShow: boolean;
  editType: string;
  editId: any;
} | {
  type: 'get questionManagement editForm';
  editForm: any;
} | {
  type: 'change questionManagement levelSort';
  levelSort: string;
} | {
  type: 'change questionManagement createTimeSort';
  createTimeSort: string;
} | {
  type: 'get questionManagement detailId';
  detailId: any;
} | {
  type: 'get questionManagement detailMsg';
  detailMsg: any;
} | {
  type: 'change questionManagement closeShow';
  closeShow: boolean;
  closeId: any;
} | {
  type: 'change questionManagement reviewShow';
  reviewShow: boolean;
  reviewId: any;
} | {
  type: 'get questionManagement reviewForm';
  reviewForm: any;
} | {
  type: 'get questionManagement eventCategory';
  eventCategory: any[];
} | {
  type: 'get questionManagement eventPerson';
  eventPerson: any[];
}
