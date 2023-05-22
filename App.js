import { StyleSheet, Text, View, Platform} from 'react-native';
import React, { useState, useEffect } from "react";
import MapView, { UrlTile } from "react-native-maps";
import * as Location from 'expo-location';

const App = () => {

  const urlTile = "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  
  const [location, setLocation] = useState({
    latitude: 50,
    longitude: 50,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  });

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
  

  return (
    <View style={styles.container}>
      <MapView
        showsMyLocationButton={true}
        style={styles.map} 
        region={location}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        // mapType={Platform.OS == "android" ? "none" : "standard"}
      >
        <UrlTile
          urlTemplate={urlTile} 
          maximumZ={15}
          flipY={false}
        />
      </MapView>
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
  map: {
    width: "100%",
    height: "100%"
  }
});

export default App;