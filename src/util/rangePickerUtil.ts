import moment from "moment";
import {RangePickerPresetRange} from "antd/lib/date-picker/interface";

export const getAllRangeQuickSet = (): {
    [range: string]: RangePickerPresetRange;
} => {
    return {
        '本周': [moment().week(moment().week()).startOf('week'), moment().week(moment().week()).endOf('week')],
        '本月': [moment().month(moment().month()).startOf('month'), moment().month(moment().month()).endOf('month')],
        '本季': [moment().month(moment().month()).startOf('quarter'), moment().month(moment().month()).endOf('quarter')],
        '本年': [moment().year(moment().year()).startOf('year'), moment().year(moment().year()).endOf('year')]
    };
};

export const getDisableTimeObj = (start = '00:00:00', end = '23:59:59') => {
    const Hours = Array.from(Array(24), (v, k) => k);
    const Minutes = Array.from(Array(60), (v, k) => k);
    const Seconds = Array.from(Array(60), (v, k) => k);
    const startArr = start.split(':').map((item: string) => parseInt(item));
    const endArr = end.split(':').map((item: string) => parseInt(item));
    const hourDisabledArr = Hours.slice(0, startArr[0] - 1).concat(Hours.slice(endArr[0] - 1, Hours.length));
    const HourDis = Hours.slice(0, startArr[0] - 1).concat(Hours.slice(endArr[0], Hours.length));
};