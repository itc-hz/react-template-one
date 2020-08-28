// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface ServiceGroupAuthorizationState {
  loading: boolean;
  serviceGroupList: any[];
  serviceGroupId: any;
  selectRowsID: any[];
  personnel: any[];
  addPersonnelShow: boolean;
  selectPersonnel: any[];
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type ServiceGroupAuthorizationAction =
 | {
  type: 'change serviceGroupAuthorization loading';
  loading: boolean;
} | {
  type: 'get serviceGroupAuthorization serviceGroupList';
  serviceGroupList: any[];
} | {
  type: 'get serviceGroupAuthorization serviceGroupId';
  serviceGroupId: any;
} | {
  type: 'get serviceGroupAuthorization selectRowsID';
  selectRowsID: any[];
} | {
  type: 'get serviceGroupAuthorization personnel';
  personnel: any[];
} | {
  type: 'change serviceGroupAuthorization addPersonnelShow';
  addPersonnelShow: boolean;
} | {
  type: 'get serviceGroupAuthorization selectPersonnel';
  selectPersonnel: any[];
}
