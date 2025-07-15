import React from 'react';
interface TimerTextProps {
    minutesLong: number;
}
declare const TimerText: ({ minutesLong, ...rest }: TimerTextProps) => React.JSX.Element;
export default TimerText;
