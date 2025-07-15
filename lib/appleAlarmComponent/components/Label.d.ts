import React from "react";
import Animated from "react-native-reanimated";
interface LabelProps {
    theta: Animated.SharedValue<number>;
    label: string;
    iconType: "clock" | "bed";
    setTime: (time: string) => void;
}
declare const Label: ({ theta, label, iconType, setTime }: LabelProps) => React.JSX.Element;
export default Label;
