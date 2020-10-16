import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView , { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';

import mapMarker from '../images/map-marker.png';

interface Orphanate {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphantesMap() {
  const [orphanates, setOrphanates] = useState<Orphanate[]>([]);
    useEffect(() => {
      api.get('orphanates')
            .then(response => {
                setOrphanates(response.data);
            })
    }, []);
    const navigation = useNavigation();

    function handleNavigateToOrphanateDetails(id: number) {
        navigation.navigate('OrphanateDetails', { id });
    }

    function handleNavigateToCreateOrphante() {
        navigation.navigate('SelectMapPosition');
    }

    return (
    <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={
            {
              latitude: -24.100864,
              longitude:-46.6550784,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
        >
          {
            orphanates.map(orphanate => {
              return (
                <Marker
                  key={orphanate.id}
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 3,
                    y: 1,
                  }}
                  coordinate={{
                    latitude: orphanate.latitude,
                    longitude:orphanate.longitude,
                  }}
                >
                  <Callout tooltip onPress={() => handleNavigateToOrphanateDetails(orphanate.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{orphanate.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })
          }
        </MapView>
  
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanates.length} orfanatos encontrados</Text>
            <TouchableOpacity style={styles.createOrphanateButton} onPress={handleNavigateToCreateOrphante}>
              <Feather name="plus" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
      </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 140,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      justifyContent: "center",
      borderRadius: 12,
    },
  
    calloutText: {
      fontFamily: "nunito700",
      fontSize: 14,
      color: "#9764db",
    },
  
    footer: {
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: "#FFF",
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  
      elevation: 2,
    },
  
    footerText: {
      fontFamily: "nunito700",
      color: "#8FA7B3",
    },
  
    createOrphanateButton: {
      width: 56,
      height: 56,
      backgroundColor: "#D6A015",
      borderRadius: 20,
  
      justifyContent: "center",
      alignItems: "center",
    },
  });  

export default OrphantesMap;