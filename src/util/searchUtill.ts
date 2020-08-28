const searchFunction = (List: any, name: string, keys?: string) => {
    if(!List){
        return;
    }
    const roomlist = List.filter((value: any) => value[keys ? keys : 'name'].indexOf(name) > -1);
    return roomlist;
};

export {
    searchFunction
};