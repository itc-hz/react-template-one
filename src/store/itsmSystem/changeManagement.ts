// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface ChangeManagementState {
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
export type ChangeManagementAction =
  | {
  type: 'get changeManagement list';
  list: any[];
  count: number;
} | {
  type: 'change changeManagement page';
  page: number;
} | {
  type: 'change changeManagement limit';
  limit: number;
} | {
  type: 'change changeManagement searchVal';
  searchVal: any;
} | {
  type: 'change changeManagement loading';
  loading: boolean;
} | {
  type: 'change changeManagement tabsKey';
  tabsKey: string;
} | {
  type: 'get changeManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change changeManagement level';
  level: any;
} | {
  type: 'change changeManagement status';
  status: any;
} | {
  type: 'get changeManagement category';
  category: any[];
} | {
  type: 'change changeManagement categoryId';
  categoryId: any;
} | {
  type: 'get changeManagement person';
  person: any[];
} | {
  type: 'change changeManagement personId';
  personId: any;
} | {
  type: 'get changeManagement handlePerson';
  handlePerson: any[];
} | {
  type: 'change changeManagement categorySetShow';
  categorySetShow: boolean;
} | {
  type: 'change changeManagement editShow';
  editShow: boolean;
  editType: string;
  editId: any;
} | {
  type: 'get changeManagement editForm';
  editForm: any;
} | {
  type: 'change changeManagement levelSort';
  levelSort: string;
} | {
  type: 'change changeManagement createTimeSort';
  createTimeSort: string;
} | {
  type: 'get changeManagement detailId';
  detailId: any;
} | {
  type: 'get changeManagement detailMsg';
  detailMsg: any;
} | {
  type: 'change changeManagement closeShow';
  closeShow: boolean;
  closeId: any;
} | {
  type: 'change changeManagement reviewShow';
  reviewShow: boolean;
  reviewId: any;
  reviewType: any;
}
