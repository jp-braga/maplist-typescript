import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Coordinate, Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const HomeScreen = () => {

    const [location, setLocation] = useState({
        latitude: -37.813629,
        longitude: 144.963058,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    
    const [errorMsg, setErrorMsg] = useState('');

    const handleCurrentLocationChange = (currentLocation: any) => {
        setLocation(currentLocation)
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.mapContainer} region={location} onRegionChange={handleCurrentLocationChange}>
                <Marker coordinate={location}/>
            </MapView>
        </View>
    );
} 

export default HomeScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    mapContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});