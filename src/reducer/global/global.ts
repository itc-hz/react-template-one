import {GlobalAction, GlobalState} from '@/store/global/global';

const initialState: GlobalState = {
    loginUserId: '',
    globalUser: {},
    getUserPermission: [],
    getUserPermissionIds: '',
};

export default function reducer(
    state: GlobalState | null | undefined = initialState,
    action: GlobalAction,
): GlobalState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change global loginUser": {
            return {
                ...state,
                loginUserId: action.loginUserId,
                globalUser: action.globalUser
            };
        }

        case "change global getUserPermission": {
            return {
                ...state,
                getUserPermission: action.getUserPermission,
                getUserPermissionIds: action.getUserPermissionIds,
            };
        }
        default:
            return state;
    }
}
