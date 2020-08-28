// 防抖函数  限制在一定时间内只执行一次

let debounceTimer: any = null; 
let throttleTimer = true;
const debounce = (fn: () => void, delay: number) => {

    if(debounceTimer){
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        fn();
    }, delay);

};

// 节流函数  执行一次后一段时间不让期执行
const throttle = (fn: () => void, delay: number) => {
    if(!throttleTimer){
        return false;
    }
    throttleTimer = false;
    setTimeout(() => {
        fn();
        throttleTimer = true;
    }, delay);

};
export {
    debounce,
    throttle
};