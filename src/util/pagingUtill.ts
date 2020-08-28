const pagingFunction = (List: any, page: number, limit: number) => {
    if(!List){
        return;
    }
    const roomlist = List.slice((page - 1) * limit, page * limit);
    return roomlist;
};

export {
    pagingFunction
};