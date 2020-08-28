// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface ServiceControlState {
  list: any[];
  count: number;
  page: number;
  limit: number;
  searchVal: any;
  loading: boolean;
  listLoading: boolean;
  moduleId: any;
  consoleData: any;
  levelSort: string;
  createTimeSort: string;
  formControl: boolean;
  backModuleId: any;
  backSearchVal: any;
  showList: boolean;
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type ServiceControlAction =
  | {
  type: 'get serviceControl list';
  list: any[];
  count: number;
} | {
  type: 'change serviceControl page';
  page: number;
} | {
  type: 'change serviceControl limit';
  limit: number;
} | {
  type: 'change serviceControl searchVal';
  searchVal: any;
} | {
  type: 'change serviceControl loading';
  loading: boolean;
} | {
  type: 'change serviceControl listLoading';
  listLoading: boolean;
} | {
  type: 'change serviceControl moduleId';
  moduleId: any;
} | {
  type: 'get serviceControl consoleData';
  consoleData: any;
} | {
  type: 'change serviceControl levelSort';
  levelSort: string;
} | {
  type: 'change serviceControl createTimeSort';
  createTimeSort: string;
} | {
  type: 'change serviceControl formControl';
  formControl: boolean;
  backModuleId: any;
  backSearchVal: any;
} | {
  type: 'change serviceControl showList';
  showList: boolean;
}
