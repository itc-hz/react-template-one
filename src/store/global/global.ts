export interface GlobalState {
    loginUserId: string;
    globalUser: any;
    getUserPermission: Array<any>;
    getUserPermissionIds:  Array<number>;
}

export type GlobalAction =
    | {
    type: 'change global loginUser';
    loginUserId: string;
    globalUser: any;
} | {
    type: 'change global getUserPermission';
    getUserPermission: Array<any>;
    getUserPermissionIds: Array<number>;
}