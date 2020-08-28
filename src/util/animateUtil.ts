// get cssStyle by after render
const funTransitionHeight = (element: HTMLElement, time?: number): void => {
    if (typeof window.getComputedStyle == "undefined") return;

    const height = window.getComputedStyle(element).height;

    element.style.transition = "none";
    element.style.height = "auto";
    const targetHeight = window.getComputedStyle(element).height;
    if (time) element.style.transition = "height " + time + "s";
    element.style.height = height;
    setTimeout(() => {
        element.style.height = targetHeight;
    }, 100);
};

export {
    funTransitionHeight
};