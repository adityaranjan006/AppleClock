import React, { useMemo } from "react";
import { polar2Canvas } from "react-native-redash";
import { Circle, Line, G, Text, Defs, LinearGradient, Stop } from "react-native-svg";
import MoonAlarm from "../../assets/moonAlarm.svg";
import SunAlarm from "../../assets/sunAlarm.svg";
import { Dimensions } from "react-native";
import { CENTER, PADDING, R, SIZE, STROKE, TAU } from "../Constants";
import { convertTo24Hour } from "../../utils/convertTime24Hour";

const LINES = 60;
const DELTA = TAU / LINES;
const { height } = Dimensions.get("window");

interface QuadrantProps {
  actualBedTime: string;
  actualAlarmTime: string;
}

const Quadrant = ({ actualBedTime, actualAlarmTime }: QuadrantProps) => {
  // Calculate duration between bedtime and alarm time in hours
  const durationGap = useMemo(() => {
    const bedHour = parseInt(convertTo24Hour(actualBedTime));
    const alarmHour = parseInt(convertTo24Hour(actualAlarmTime));
    return (alarmHour - bedHour + 24) % 24;
  }, [actualBedTime, actualAlarmTime]);

  // Predefined hour labels to simplify switch case
  const hourLabels = [
    "12 AM", "2", "4", "6 AM", "8", "10", 
    "12 PM", "2", "4", "6 PM", "8", "10"
  ];

  return (
    <>
      {/* Gradients for circle coloring */}
      <Defs>
        {/* <LinearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF9F0A" />
          <Stop offset="1" stopColor="#FF9500" />
        </LinearGradient> */}
        <LinearGradient id="circleGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#AEAEAE" />
          <Stop offset="1" stopColor="#5D5D5D" />
        </LinearGradient>
      </Defs>

      {/* Main Clock Circle */}
      <Circle strokeWidth={STROKE} stroke="#1C1B1D" cx={SIZE / 2} cy={SIZE / 2} r={R} />

      <G mask="url(#mask)">
        {/* Color circle based on sleep duration */}
        <Circle 
          fill={"url(#circleGradient)"} 
          cx={SIZE / 2} 
          cy={SIZE / 2} 
          r={R + PADDING} 
          strokeLinecap="round" 
        />

        {/* Small tick marks for minutes */}
        {Array.from({ length: LINES }, (_, i) => {
          const theta = DELTA * i;
          const p1 = polar2Canvas({ theta, radius: R - PADDING / 3 }, CENTER);
          const p2 = polar2Canvas({ theta, radius: R + PADDING / 3 }, CENTER);
          return <Line key={i} stroke="#000000" strokeWidth={3} strokeLinecap="round" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
        })}
      </G>

      {/* Hour tick marks */}
      {Array.from({ length: 24 }, (_, i) => {
        const theta = (i * TAU) / 24;
        const p1 = polar2Canvas({ theta, radius: R - 1.4 * PADDING }, CENTER);
        const p2 = polar2Canvas({ theta, radius: R - (2.5 * PADDING) / 2 }, CENTER);

        return (
          <Line
            key={i}
            stroke="#646367"
            strokeWidth={i % 12 === 0 ? 2 : i % 2 === 0 ? 1.5 : 1}
            strokeLinecap="round"
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
          />
        );
      })}

      {/* Moon and Sun Icons */}
      <G>
        <G transform={`translate(${SIZE / 2 - 6},${SIZE / 2 - R + 3.2 * PADDING - 10})`}>
          <MoonAlarm width={height * 0.015} height={height * 0.015} />
        </G>
        <G transform={`translate(${SIZE / 2 - 6},${SIZE / 2 + R - 3.2 * PADDING - 10})`}>
          <SunAlarm width={height * 0.015} height={height * 0.015} />
        </G>
      </G>

      {/* Hour Labels */}
      {hourLabels.map((label, i) => {
        const theta = (-i * TAU) / 12 + TAU / 4;
        const position = polar2Canvas({ theta, radius: R - 2.2 * PADDING }, CENTER);
        const isMajorLabel = label.includes("AM") || label.includes("PM");

        return (
          <Text
            key={i}
            x={position.x}
            y={position.y}
            fill="#646367"
            fontSize={isMajorLabel ? 11 : 10}
            fontWeight={isMajorLabel ? "bold" : "normal"}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {label}
          </Text>
        );
      })}
    </>
  );
};

export default Quadrant;
