import React from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";
interface CursorOverlayProps {
    position: Animated.SharedValue<Vector>;
    icon: "Clock" | "Bed";
}
declare const CursorOverlay: ({ position, icon }: CursorOverlayProps) => React.JSX.Element;
export default CursorOverlay;
