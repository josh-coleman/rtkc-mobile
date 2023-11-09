import { usePowerState } from "expo-battery";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { lowPowerMode, batteryLevel, batteryState } = usePowerState();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log(batteryLevel);
  return (
    <View style={styles.container}>
      <Text>{"Battery Level: " + batteryLevel}</Text>
      <Text>{"Battery State: " + (batteryState === 1 ? 'Unplugged' : 'Charging')}</Text>
      <Text>{"Low Power: " + lowPowerMode}</Text>
      <Text>{"Device: " + Device.modelName}</Text>
      <Text>{"Location: " + JSON.stringify(location)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
