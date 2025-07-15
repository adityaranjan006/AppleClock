import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "react-native-linear-gradient";

import {
  PADDING,
} from "../Constants";

import Label from "./Label";


interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
  bedTimeSet: (time: string) => void;
  alarmTimeSet: (time: string) => void;
  actualBedTime?: string;
  actualAlarmTime?: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F0F0F",
    justifyContent: "center",
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%",
    paddingHorizontal:10
  },
  duration: {
    fontFamily: "SFProRounded-Medium",
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "white",
  },
  Gradient: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderRadius:16,
    borderColor:"#1F1F1F"
  }
});

const Container = ({ start, end, children, bedTimeSet, alarmTimeSet }: ContainerProps) => {
  return (
    <LinearGradient
      colors={["#0F0F0F", "#0F0F0F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.Gradient}
    >
      {children}
      <View style={{width:"100%",alignItems:"center",marginTop:15}}>
        <View style={styles.values}>
          <Label theta={end} label="BEDTIME" iconType="bed" setTime={bedTimeSet} />
          <Label theta={start} label="WAKE UP" iconType="clock" setTime={alarmTimeSet} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Container;
