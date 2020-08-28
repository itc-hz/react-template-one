// 定义对应reduce函数初始数据应该包含哪些数据和对应数据类型
export interface ServiceSettingState {
  loading: boolean;
  moduleList: any[];
  moduleId: any;
  setMsg: any;
  personnel: any[];
}

// 定义对应reduce函数中的action的type属性值和一一对应的数据类型
export type ServiceSettingAction =
 | {
  type: 'change serviceSetting loading';
  loading: boolean;
} | {
  type: 'get serviceSetting moduleList';
  moduleList: any[];
} | {
  type: 'get serviceSetting moduleId';
  moduleId: any;
} | {
  type: 'get serviceSetting setMsg';
  setMsg: any;
} | {
  type: 'get serviceSetting personnel';
  personnel: any[];
}
