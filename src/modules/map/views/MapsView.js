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

import MarkerCallout from '../components/MarkerCallout';
import { fetchLocationAndForecast } from '../MapActions';


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

    const coordinates = R.compose(
      R.join(','),
      R.map(x => x.toFixed(4)),
      R.reverse,
      R.values
    )(coordinate);

    dispatch(fetchLocationAndForecast(coordinates));

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=administrative_area_level_1&key=AIzaSyBhjV8h-2MjxCGn8VSqE6Bj4yjgYDrhKEk`)
      .then(res => console.log(res));
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