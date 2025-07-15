import React from "react";
interface BedtimeProps {
    bedTimeSet: (time: string) => void;
    alarmTimeSet: (time: string) => void;
    actualBedTime: string;
    actualAlarmTime: string;
}
declare const Bedtime: ({ bedTimeSet, alarmTimeSet, actualBedTime, actualAlarmTime }: BedtimeProps) => React.JSX.Element;
export default Bedtime;
