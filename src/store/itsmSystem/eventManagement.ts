// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface EventManagementState {
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
  handlePerson: any[],
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
  workOrderCategory: any[];
  workOrderPerson: any[];
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type EventManagementAction =
  | {
  type: 'get eventManagement list';
  list: any[];
  count: number;
} | {
  type: 'change eventManagement page';
  page: number;
} | {
  type: 'change eventManagement limit';
  limit: number;
} | {
  type: 'change eventManagement searchVal';
  searchVal: any;
} | {
  type: 'change eventManagement loading';
  loading: boolean;
} | {
  type: 'change eventManagement tabsKey';
  tabsKey: string;
} | {
  type: 'get eventManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change eventManagement level';
  level: any;
} | {
  type: 'change eventManagement status';
  status: any;
} | {
  type: 'get eventManagement category';
  category: any[];
} | {
  type: 'change eventManagement categoryId';
  categoryId: any;
} | {
  type: 'get eventManagement person';
  person: any[];
} | {
  type: 'change eventManagement personId';
  personId: any;
} | {
  type: 'get eventManagement handlePerson';
  handlePerson: any[];
} | {
  type: 'change eventManagement categorySetShow';
  categorySetShow: boolean;
} | {
  type: 'change eventManagement editShow';
  editShow: boolean;
  editType: string;
  editId: any;
} | {
  type: 'get eventManagement editForm';
  editForm: any;
} | {
  type: 'change eventManagement levelSort';
  levelSort: string;
} | {
  type: 'change eventManagement createTimeSort';
  createTimeSort: string;
} | {
  type: 'get eventManagement detailId';
  detailId: any;
} | {
  type: 'get eventManagement detailMsg';
  detailMsg: any;
} | {
  type: 'change eventManagement closeShow';
  closeShow: boolean;
  closeId: any;
} | {
  type: 'change eventManagement reviewShow';
  reviewShow: boolean;
  reviewId: any;
} | {
  type: 'get eventManagement reviewForm';
  reviewForm: any;
} | {
  type: 'get eventManagement workOrderCategory';
  workOrderCategory: any[];
} | {
  type: 'get eventManagement workOrderPerson';
  workOrderPerson: any[];
}
