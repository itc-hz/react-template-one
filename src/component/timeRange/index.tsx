import React, {forwardRef} from 'react';
import {Row, Col, TimePicker} from 'antd';
import moment from 'moment';

interface TimPickerProps{
    prefixCls?: string;
    value?: [moment.Moment, moment.Moment];
    onChange?: (times: {
        start: moment.Moment;
        end: moment.Moment;
    }) => void;
    format?: string;
    disabled?: boolean;
}

const TimePickerRange: React.FC<TimPickerProps> = (props: TimPickerProps, ref) => {
    const {
        onChange,
        disabled
    } = props;
    const value: any = props.value;
    const [startTime, setStartTime] = React.useState((value && value.start) || moment());

    const [endTime, setEndTime] = React.useState((value && value.end) || moment());

    /*定义时间数组*/
    const Hours = Array.from(Array(24), (v, k) => k);
    const Minutes = Array.from(Array(60), (v, k) => k);
    const Seconds = Array.from(Array(60), (v, k) => k);

    const triggerChange = (changedValue: { start?: moment.Moment; end?: moment.Moment }) => {
        if (onChange) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onChange(
                Object.assign({}, {start: startTime, end: endTime}, changedValue)
            );
        }
    };

    /*结束时间控制-hour*/
    const disEndHouse = () => {
        if (startTime) {
            const h = startTime.hour();
            return Hours.slice(0, h);
        }
        return [];
    };

    /*结束时间控制-minute）*/
    const disEndMinute = (h: number) => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            const m = startTime.minute();
            return Minutes.slice(0, m);
        }
        return [];
    };

    /*结束时间控制-second*/
    const disEndSeconds = (h: number, m: number) => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            if (m > startTime.minute()) return [];
            const s = startTime.second();
            return Seconds.slice(0, s);
        }
        return [];
    };

    /*开始时间控制-hour*/
    const disStartHouse = () => {
        if (endTime) {
            const h = endTime.hour();
            return Hours.slice(h + 1, Hours.length);
        }
        return [];
    };

    /*开始时间控制-minute*/
    const disStartMinute = (h: number) => {
        if (endTime) {
            if (h < endTime.hour()) return [];
            const m = endTime.minute();
            return Minutes.slice(m, Minutes.length - 1);
        }
        return [];
    };

    /*开始时间控制-second*/
    const disStartSeconds = (h: number, m: number) => {
        if (endTime) {
            if (h < endTime.hour()) return [];
            if (m < endTime.minute()) return [];
            const s = endTime.second();
            return Seconds.slice(s, Seconds.length - 1);
        }
        return [];
    };
    
    return (
        <Row ref={ref}>
            <Col span={11}>
                <TimePicker
                    style={{width: '100%'}}
                    allowClear={false}
                    disabled={disabled}
                    onChange={(value, str) => {
                        setStartTime(value);
                        triggerChange({start: value});
                    }}
                    format={props.format}
                    value={(value && value.start) || moment('00:00:00', 'HH:mm:ss')}
                    disabledHours={disStartHouse}
                    disabledMinutes={disStartMinute}
                    disabledSeconds={disStartSeconds}
                />
            </Col>
            <Col span={2} style={{textAlign: 'center'}}>～</Col>
            <Col span={11}>
                <TimePicker
                    style={{width: '100%'}}
                    allowClear={false}
                    disabled={disabled}
                    onChange={value => {
                        setEndTime(value);
                        triggerChange({end: value});
                    }}
                    format={props.format}
                    value={(value && value.end) || moment('23:59:59', 'HH:mm:ss')}
                    disabledHours={disEndHouse}
                    disabledMinutes={disEndMinute}
                    disabledSeconds={disEndSeconds}
                />
            </Col>
        </Row>
    );
};

export default forwardRef(TimePickerRange);