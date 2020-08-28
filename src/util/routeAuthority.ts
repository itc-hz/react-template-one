
const RouteAuthorityFn: any = (route: Array<any>, getUserPermission: Array<any>, keys?: string) => {
    return route.filter((val: any) => {
        if(val.children){
            val.children = RouteAuthorityFn(val.children, getUserPermission);
            return val.children.length > 0 ? true : false;
        }
        return getUserPermission.indexOf(val.permissionId) > -1; 
    });
};

export {
    RouteAuthorityFn
};