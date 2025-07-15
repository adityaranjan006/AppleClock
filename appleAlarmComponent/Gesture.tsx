import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { canvas2Polar, Vector } from "react-native-redash";
import * as Haptics from 'expo-haptics';

import { absoluteDuration, CENTER, containedInSquare, normalize, STROKE } from "./Constants";
import CursorOverlay from "./CursorOverlay";

enum Region {
  START,
  END,
  MAIN,
}

// Function to trigger haptic feedback safely
const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
  Haptics.impactAsync(style);
};

interface GestureProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  startPos: Animated.SharedValue<Vector>;
  endPos: Animated.SharedValue<Vector>;
  minAngleSeparation?: number;
}

const Gesture = ({ start, end, startPos, endPos, minAngleSeparation }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number; region: Region }
  >({
    onStart: ({ x, y }, ctx) => {
      if (containedInSquare({ x, y }, startPos.value, STROKE)) {
        ctx.region = Region.START;
        ctx.offset = start.value;
      } else if (containedInSquare({ x, y }, endPos.value, STROKE)) {
        ctx.region = Region.END;
        ctx.offset = end.value;
      } else {
        ctx.region = Region.MAIN;
        const { theta } = canvas2Polar({ x, y }, CENTER);
        ctx.offset = theta;
      }
    },
    onActive: ({ x, y }, ctx) => {
      const { theta } = canvas2Polar({ x, y }, CENTER);
      const delta = theta - ctx.offset;

      let newStart = start.value;
      let newEnd = end.value;

      if (ctx.region === Region.START || ctx.region === Region.MAIN) {
        const previousStart = start.value;
        newStart = normalize(start.value + delta);
        if (Math.floor(previousStart / (Math.PI / 72)) !== Math.floor(newStart / (Math.PI / 72))) {
          runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
      if (ctx.region === Region.END || ctx.region === Region.MAIN) {
        const previousEnd = end.value;
        newEnd = normalize(end.value + delta);
        if (Math.floor(previousEnd / (Math.PI / 72)) !== Math.floor(newEnd / (Math.PI / 72))) {
          runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
      
      if (minAngleSeparation) {
        const currentDuration = absoluteDuration(newStart, newEnd);
        if (currentDuration < minAngleSeparation) {
          if (ctx.region === Region.START) {
            newEnd = normalize(newStart + minAngleSeparation);
            runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
          } 
          else if (ctx.region === Region.END) {
            newStart = normalize(newEnd - minAngleSeparation);
            runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
          }
          else if (ctx.region === Region.MAIN) {
            if (currentDuration < minAngleSeparation) {
              runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
              return;
            }
          }
        }
        else if (currentDuration > 5.2) {
          const maxDuration = 5.2;
          if (ctx.region === Region.START) {
            newEnd = normalize(newStart + maxDuration);
            runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
          }
          else if (ctx.region === Region.END) {
            newStart = normalize(newEnd - maxDuration);
            runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
          }
          else if (ctx.region === Region.MAIN) {
            if (currentDuration > maxDuration) {
              runOnJS(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
              return;
            }
          }
        }
      }
      start.value = newStart;
      end.value = newEnd;
      ctx.offset = theta;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <CursorOverlay position={endPos} icon="Bed" />
        <CursorOverlay position={startPos} icon="Clock" />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Gesture;
