// @flow
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { StatusBar, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as R from 'ramda';
import axios from 'axios';

import Bar from '@components/Bar';
import { setSearchText } from '@modules/search/SearchActions';
import GoogleGeolocation from '@services/googleGeolocation';

import MarkerCallout from '../components/MarkerCallout';
import { fetchCurrentWeather, setLocation } from '../MapActions';


type MapViewProps = {
  navigation: Object,
}

const MapsView = ({ navigation }: MapViewProps) => {
  const dispatch = useDispatch();
  const marker = useRef(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  const hideCallout = () => {
    if (marker.current) marker.current.hideCallout();
  };

  const handleLongMapPress = ({ coordinate }) => {
    hideCallout();
  
    setMarkerCoordinates(coordinate);

    const { latitude, longitude } = coordinate;

    dispatch(fetchCurrentWeather(coordinate));

    GoogleGeolocation.findLocationName(latitude, longitude).then(res => {
      dispatch(setLocation(res));
    });
  };

  const handleCalloutPress = (locationName) => {
    dispatch(setSearchText({ text: locationName }));
    navigation.navigate('Search');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <Maps
            onPress={hideCallout}
            initialRegion={{
              latitude: 49.0139,
              longitude: 31.2858,
              latitudeDelta: 20,
              longitudeDelta: 9,
            }}
            onLongPress={(e) => handleLongMapPress(e.nativeEvent)}
          >
            {markerCoordinates && (
              <Marker
                ref={marker}
                coordinate={markerCoordinates}
              >
                <MarkerCallout onCalloutPress={handleCalloutPress} />
              </Marker>)}
          </Maps>
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

const Maps = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default MapsView;