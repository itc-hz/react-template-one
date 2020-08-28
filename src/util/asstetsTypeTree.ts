
export const assetsTypeTress = (data: any) => {

    data && data.map((val: any) => {
        val.title = val.type_name;
        val.value = val.id;
        if(val.children){
            val.children = assetsTypeTress(val.children);
        }
    });

    return data;
};