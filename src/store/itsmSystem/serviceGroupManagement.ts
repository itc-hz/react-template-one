// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface ServiceGroupManagementState {
  loading: boolean;
  serviceGroupList: any[];
  serviceGroupId: any;
  permission: any[];
  selectRowsID: any[];
  addGroupShow: boolean;
  addPermissionShow: boolean;
  selectPermission: any[];
  selectedPermission: any[];
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type ServiceGroupManagementAction =
 | {
  type: 'change serviceGroupManagement loading';
  loading: boolean;
} | {
  type: 'get serviceGroupManagement serviceGroupList';
  serviceGroupList: any[];
} | {
  type: 'get serviceGroupManagement serviceGroupId';
  serviceGroupId: any;
} | {
  type: 'get serviceGroupManagement permission';
  permission: any[];
} | {
  type: 'get serviceGroupManagement selectRowsID';
  selectRowsID: any[];
} | {
  type: 'change serviceGroupManagement addGroupShow';
  addGroupShow: boolean;
} | {
  type: 'change serviceGroupManagement addPermissionShow';
  addPermissionShow: boolean;
} | {
  type: 'get serviceGroupManagement selectPermission';
  selectPermission: any[];
} | {
  type: 'get serviceGroupManagement selectedPermission';
  selectedPermission: any[];
} 
