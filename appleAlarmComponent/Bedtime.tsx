import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import CircularSlider from "./CircularSlider";
import { PADDING, PI, TAU, ONE_MINUTE_RAD, ONE_HOUR_RAD } from "./Constants";
import Container from "./components/Container";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //padding: PADDING,
  },
  title: {
    fontFamily: "SFProRounded-Semibold",
    fontSize: 36,
    color: "white",
    marginBottom: 32,
  },
});

const MIN_ANGLE_SEPARATION = PI / 7;
interface BedtimeProps {
  bedTimeSet: (time: string) => void;
  alarmTimeSet: (time: string) => void;
  actualBedTime: string;
  actualAlarmTime: string;
}

const timeToRadians = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  }
  if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  const angle = (6 - hours) * ONE_HOUR_RAD - minutes * ONE_MINUTE_RAD;

  return angle;
};

const Bedtime = ({ bedTimeSet, alarmTimeSet, actualBedTime, actualAlarmTime }: BedtimeProps) => {
  const start = useSharedValue(timeToRadians(actualAlarmTime));
  const end = useSharedValue(timeToRadians(actualBedTime));
  
  React.useEffect(() => {
    start.value = timeToRadians(actualAlarmTime);
    end.value = timeToRadians(actualBedTime);
  }, [actualAlarmTime, actualBedTime]);
  
  const angleDiff = useDerivedValue(() => {
    const diff = (end.value - start.value + TAU) % TAU;
    if (diff < MIN_ANGLE_SEPARATION) {
      return (start.value + MIN_ANGLE_SEPARATION) % TAU;
    }
    return end.value;
  });

  React.useEffect(() => {
    end.value = angleDiff.value;
  }, [angleDiff]);
  
  return (
    <View style={styles.container}>
      <Container start={start} end={end} bedTimeSet={bedTimeSet} alarmTimeSet={alarmTimeSet} actualBedTime={actualBedTime} actualAlarmTime={actualAlarmTime}>
        <CircularSlider 
          start={start} 
          end={end} 
          minAngleSeparation={MIN_ANGLE_SEPARATION}
          actualBedTime={actualBedTime}
          actualAlarmTime={actualAlarmTime}
        />
      </Container>
    </View>
  );
};

export default Bedtime;