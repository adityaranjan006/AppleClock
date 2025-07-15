import React from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";
interface CursorProps {
    pos: Animated.SharedValue<Vector>;
}
declare const Cursor: ({ pos }: CursorProps) => React.JSX.Element;
export default Cursor;
