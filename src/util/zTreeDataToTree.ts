export const zTreeToTree = (arr: any) => {
    const res = [];
    const map = arr.reduce((res: any, item: any) => ((res[item.id] = item), res), {});
    for (const item of Object.values(map)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (!item['pId']) {
            res.push(item);
        } else {

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const parent = map[item.pId];
            parent['children'] = parent['children'] || [];
            parent['children'].push(item);
        }
    }
    return res;
};

export function translateDataToTree(data: any) {
    let parents = data.filter((value: any) => !value.pId);
    let childrens = data.filter((value: any) => value.pId);
    parents = parents.map((item: any, index: number) => {
        item.key = item.id;
        item.title = item.name;
        if (item.isDepartment) {
            item.value = item.id + ':' + index.toString() + ':' + 'd';
        } else {
            item.value = item.id + ':' + 'salt';
        }
        return item;
    });
    childrens = childrens.map((item: any, index: number) => {
        item.key = item.id;
        item.title = item.name;
        if (item.isDepartment) {
            item.value = item.id + ':' + (index + parents.length).toString() + ':' + 'd';
        } else {
            item.value = item.id + ':' + 'salt';
        }
        return item;
    });
    const translator = (parents: any, childrens: any) => {
        parents.forEach((parent: any) => {
                childrens.forEach((current: any, index: any) => {
                        if (current.pId === parent.id) {
                            const temp = JSON.parse(JSON.stringify(childrens));
                            temp.splice(index, 1);
                            translator([current], temp);
                            typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current];
                        }
                    }
                );
            }
        );
    };

    translator(parents, childrens);
    return parents;
}

export function translateDataToTreeUserid(data: any) {
    let parents = data.filter((value: any) => !value.pId);
    let childrens = data.filter((value: any) => value.pId);
    parents = parents.map((item: any, index: number) => {
        item.key = item.user_id;
        item.title = item.name;
        if (item.isDepartment) {
            item.value = item.user_id + ':' + index.toString() + ':' + 'd';
        } else {
            item.value = item.user_id + ':' + 'salt';
        }
        return item;
    });
    childrens = childrens.map((item: any, index: number) => {
        item.key = item.user_id;
        item.title = item.name;
        if (item.isDepartment) {
            item.value = item.user_id + ':' + (index + parents.length).toString() + ':' + 'd';
        } else {
            item.value = item.user_id + ':' + 'salt';
        }
        return item;
    });
    const translator = (parents: any, childrens: any) => {
        parents.forEach((parent: any) => {
                childrens.forEach((current: any, index: any) => {
                        if (current.pId === parent.id) {
                            const temp = JSON.parse(JSON.stringify(childrens));
                            temp.splice(index, 1);
                            translator([current], temp);
                            typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current];
                        }
                    }
                );
            }
        );
    };

    translator(parents, childrens);
    return parents;
}

export function translateDataToTreeDepartment(data: any) {
    const desr = (item: any) => {
        if(item.children){
            item.children = item.children.map((lis: any) => {
                return desr(lis);
            });
        }
        item.pId = item.parent_id;
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        return item;
    };
    
    const newdata = data.map((item: any) => {
        return desr(item);
    });
    return newdata;
}

export const objDeepCopy = (source: any) => {
    const sourceCopy = source instanceof Array ? [] : {};
    for (const item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
};

export const treeToList = (data: any): any => {
    const list: any = [];
    const toList = (data: any, name?: any): any => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].children && data[i].children.length > 0) {
                toList(data[i].children, name + data[i].name);
            } else {
                list.push({
                    id: data[i].id,
                    name: name + data[i].name
                });
            }
        }
    };
    toList(data, '');
    return list;
};

export const arrayUnique = (arr: any, name: string) => {
    const hash = {};
    return arr.reduce((item: any, next: any) => {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
    }, []);

};
