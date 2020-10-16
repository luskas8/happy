import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleMapClick(event: MapEvent) {
    // const { cordinate, position } = event.;
    //  setPosition({
    //    latitude: lat,
    //    longitude: lng,
    // });
   }

  function handleNextStep() {
    navigation.navigate('OrphanateData');
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -24.100864,
          longitude:-46.6485248,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleMapClick}
      >
        <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: -24.100864, longitude: -46.6485248 }}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#D6A015',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'nunito800',
    fontSize: 16,
    color: '#FFF',
  }
})