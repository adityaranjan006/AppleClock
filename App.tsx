import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Bedtime from './appleAlarmComponent/Bedtime';
import { useState } from 'react';

export default function App() {
  const [bedTime, setBedTime] = useState("8:00 pm");
  const [alarmTime, setAlarmTime] = useState("8:00 am");

  return (
    <View style={styles.container}>
      <Bedtime bedTimeSet={setBedTime} alarmTimeSet={setAlarmTime} actualBedTime={bedTime} actualAlarmTime={alarmTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
