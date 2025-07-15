import React, { ReactNode } from "react";
import Animated from "react-native-reanimated";
interface ContainerProps {
    start: Animated.SharedValue<number>;
    end: Animated.SharedValue<number>;
    children: ReactNode;
    bedTimeSet: (time: string) => void;
    alarmTimeSet: (time: string) => void;
    actualBedTime?: string;
    actualAlarmTime?: string;
}
declare const Container: ({ start, end, children, bedTimeSet, alarmTimeSet }: ContainerProps) => React.JSX.Element;
export default Container;
