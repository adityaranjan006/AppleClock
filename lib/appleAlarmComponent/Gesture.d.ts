import React from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";
interface GestureProps {
    start: Animated.SharedValue<number>;
    end: Animated.SharedValue<number>;
    startPos: Animated.SharedValue<Vector>;
    endPos: Animated.SharedValue<Vector>;
    minAngleSeparation?: number;
}
declare const Gesture: ({ start, end, startPos, endPos, minAngleSeparation }: GestureProps) => React.JSX.Element;
export default Gesture;
