import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedReaction, runOnJS } from "react-native-reanimated";
import Clock from "../../assets/clockNav.svg"
import Bed from "../../assets/bedNav.svg"
import { Dimensions } from "react-native";
import { radToMinutes } from "../Constants";

const {height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    gap: 8,
    width: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  iconLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  time: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter-bold",
    fontWeight: "500",
    textAlign: "center",
    minWidth: 120,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-bold",
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

interface LabelProps {
  theta: Animated.SharedValue<number>;
  label: string;
  iconType: "clock" | "bed";
  setTime: (time: string) => void;
}

const getAmPm = (hours: number) => {
  return hours >= 12 ? "pm" : "am";
}

const formatTimeWithAmPm = (hours: number, minutes: number) => {
  const ampm = getAmPm(hours);
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const convertTo12HourFormat = (hours: number, minutes: number) => {
  const formattedHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

const normalizeHours = (hours: number): number => {
  return hours % 24;
}
const Label = ({ theta, label, iconType, setTime }: LabelProps) => {
  const [timeDisplay, setTimeDisplay] = useState("00:00");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const updateTimeInMinutes = (rawMinutes: number) => {
    try {
      const totalMinutes = isNaN(rawMinutes) ? 0 : Math.round(rawMinutes);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);

      const formattedTime = formatTimeWithAmPm(hours, minutes);
      
      setTime(formattedTime);
      setTimeDisplay(formattedTime);
    } catch (e) {
      setTimeDisplay("00:00");
    }
  };

  const debouncedUpdateTimeIn5Minutes = (rawMinutes: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      try {
        // Round to the nearest 5 minutes
        const totalMinutes = isNaN(rawMinutes) ? 0 : Math.round(rawMinutes / 5) * 5;
        let hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        hours = normalizeHours(hours);
        const formattedTime = formatTimeWithAmPm(hours, minutes);
        setTime(formattedTime);
        setTimeDisplay(formattedTime);
      } catch (e) {
        setTimeDisplay("00:00");
      }
    }, 180);
  };
  
  useAnimatedReaction(
    () => theta.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        const minutes = radToMinutes(currentValue);
        runOnJS(debouncedUpdateTimeIn5Minutes)(minutes);
      }
    },
    [theta]
  );
  
  // Clean up the timer when component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  React.useEffect(() => {
    debouncedUpdateTimeIn5Minutes(radToMinutes(theta.value));
  }, []);
  
  const iconSize = height*0.016
  const Icon = iconType === "clock" ? Clock : Bed
  
  return (
    <View style={styles.container}>
      <View style={styles.iconLabelContainer}>
        <Icon width={iconSize} height={iconSize}/>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.time}>{timeDisplay}</Text>
    </View>
  );
};

export default Label;