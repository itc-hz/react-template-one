// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface WorkOrderManagementState {
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
  reviewType: any;
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type WorkOrderManagementAction =
  | {
  type: 'get workOrderManagement list';
  list: any[];
  count: number;
} | {
  type: 'change workOrderManagement page';
  page: number;
} | {
  type: 'change workOrderManagement limit';
  limit: number;
} | {
  type: 'change workOrderManagement searchVal';
  searchVal: any;
} | {
  type: 'change workOrderManagement loading';
  loading: boolean;
} | {
  type: 'change workOrderManagement tabsKey';
  tabsKey: string;
} | {
  type: 'get workOrderManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change workOrderManagement level';
  level: any;
} | {
  type: 'change workOrderManagement status';
  status: any;
} | {
  type: 'get workOrderManagement category';
  category: any[];
} | {
  type: 'change workOrderManagement categoryId';
  categoryId: any;
} | {
  type: 'get workOrderManagement person';
  person: any[];
} | {
  type: 'change workOrderManagement personId';
  personId: any;
} | {
  type: 'get workOrderManagement handlePerson';
  handlePerson: any[];
} | {
  type: 'change workOrderManagement categorySetShow';
  categorySetShow: boolean;
} | {
  type: 'change workOrderManagement editShow';
  editShow: boolean;
  editType: string;
  editId: any;
} | {
  type: 'get workOrderManagement editForm';
  editForm: any;
} | {
  type: 'change workOrderManagement levelSort';
  levelSort: string;
} | {
  type: 'change workOrderManagement createTimeSort';
  createTimeSort: string;
} | {
  type: 'get workOrderManagement detailId';
  detailId: any;
} | {
  type: 'get workOrderManagement detailMsg';
  detailMsg: any;
} | {
  type: 'change workOrderManagement closeShow';
  closeShow: boolean;
  closeId: any;
} | {
  type: 'change workOrderManagement reviewShow';
  reviewShow: boolean;
  reviewId: any;
  reviewType: any;
}
