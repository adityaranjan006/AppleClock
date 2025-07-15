import React from "react";
interface QuadrantProps {
    actualBedTime: string;
    actualAlarmTime: string;
}
declare const Quadrant: ({ actualBedTime, actualAlarmTime }: QuadrantProps) => React.JSX.Element;
export default Quadrant;
