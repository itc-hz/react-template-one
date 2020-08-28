const getUrlParam = (path: string, name: string): string | null => {
    const queryString = path.split('?')[1] || '';
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
};

export {
    getUrlParam
};