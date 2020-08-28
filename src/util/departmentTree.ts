
export const departmentTree = (arr: any) => {
    const departmentMap = (item: any) => {
        return item.map((list: any) => {
            list.value = list.id;
            list.title = list.name;
            if(list.children){
                list.children = departmentMap(list.children);
            }
            return list;
        });
    };

    const res = departmentMap(arr.data);
    return res;
};
