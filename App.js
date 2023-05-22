import { StyleSheet, Text, View, Platform} from 'react-native';
import React, { useState, useEffect } from "react";
import MapView, { Polygon, Circle, UrlTile} from "react-native-maps";
import * as Location from 'expo-location';

const App = () => {

  const urlTile = "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  
  const poligon = [
    {
     latitude: -55.992610677887086,
     longitude: -15.501319502227588
    },
    {
     latitude: -56.02165326627755,
     longitude: -15.52819553456699
    },
    {
     latitude: -56.01820266171589,
     longitude: -15.543987033553066
    },
    {
     latitude: -55.98340906572389,
     longitude: -15.558946284401983
    },
    {
     latitude: -55.94832791935099,
     longitude: -15.545649226205555
    },
    {
     latitude: -55.96356808949662,
     longitude: -15.511294520543359
    },
    {
     latitude: -55.992610677887086,
     longitude: -15.501319502227588
    }
  ]

  const [location, setLocation] = useState({
    latitude: -56.00957615031356,
    longitude: -15.499102766068347,
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
      console.log(JSON.stringify(location.coords));
    })();
  }, []);
  

  return (
    <View style={styles.container}>
      <MapView
        showsMyLocationButton={true}
        style={styles.map} 
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        mapType={Platform.OS == "android" ? "none" : "standard"}
      >
        <UrlTile
          urlTemplate={urlTile} 
          maximumZ={15}
          flipY={false}
        />
        <Polygon 
          coordinates={poligon}
        />
        <Circle 
          center={{
            latitude: -15.499102766068347,
            longitude: -56.00957615031356
          }}
          radius={500}/>
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