class TimePickUtil {
    indexToTimeString(index: number, type: boolean): string {
        let hour: number = Math.floor(index / 4);
        let minutes: number = (index % 4) * 15;

        if (!type) {
            minutes += 15;
            if (minutes === 60) {
                minutes = 0;
                hour += 1;
            }
        }
        const minutesStr = minutes === 0 ? '00' : minutes.toString();
        return type ? `${hour}:${minutesStr}` : `${hour}:${minutesStr}`;
    }

    timeStringToIndex(date: string): number {
        const timeArr: string[] = date.split(':');
        const index = parseInt(timeArr[0]) * 4
            + Math.ceil(parseInt(timeArr[1]) / 15);
        return index;
    }
}

export default TimePickUtil;