// @flow
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Bar from '@components/Bar';
import GoogleGeolocation from '@services/googleGeolocation';
import { getUnitsType } from '@modules/app/AppReducer';

import MarkerCallout from '../components/MarkerCallout';
import { fetchCurrentWeather, setLocation } from '../MapActions';


type MapViewProps = {
  navigation: Object,
}

const MapsView = ({ navigation }: MapViewProps) => {
  const dispatch = useDispatch();
  const unitsType = useSelector(getUnitsType);
  const [isMapReady, setMapReady] = useState(false);
  const marker = useRef(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  const hideCallout = () => {
    if (marker.current) marker.current.hideCallout();
  };

  const handleLongMapPress = ({ coordinate }) => {
    hideCallout();
  
    setMarkerCoordinates(coordinate);

    const { latitude, longitude } = coordinate;

    dispatch(fetchCurrentWeather(coordinate, unitsType));

    GoogleGeolocation.findLocationName(latitude, longitude).then(res => {
      dispatch(setLocation(res));
    });
  };

  const handleCalloutPress = (locationName) => {
    hideCallout();
    navigation.navigate('Search', {
      locationName,
      coordinates: markerCoordinates,
    });
  };

  const handleMapLayout = () => setMapReady(true);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <MapsWrapper>
            <MapView
              style={{ ...StyleSheet.absoluteFillObject }}
              onPress={hideCallout}
              initialRegion={{
                latitude: 49.0139,
                longitude: 31.2858,
                latitudeDelta: 20,
                longitudeDelta: 9,
              }}
              onLongPress={(e) => handleLongMapPress(e.nativeEvent)}
              onLayout={handleMapLayout}
            >
              {markerCoordinates && isMapReady && (
              <Marker
                ref={marker}
                coordinate={markerCoordinates}
              >
                <MarkerCallout onCalloutPress={handleCalloutPress} />
              </Marker>
              )}
            </MapView>
          </MapsWrapper>
          <Bar
            navigation={navigation}
            dispatch={dispatch}
          />
        </Screen>
      </SafeAreaView>
    </>
  )
  };

const Screen = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const MapsWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 93%;
  position: relative;
`;

export default MapsView;