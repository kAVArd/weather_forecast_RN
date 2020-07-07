// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as R from 'ramda';

import Bar from '@components/Bar';

import { fetchLocationAndForecast } from '../MapActions';
import { getLocationNameAndTemp } from '../MapReducer';

type MapViewProps = {
  navigation: Object,
}

const MapsView = ({ navigation }: MapViewProps) => {
  const dispatch = useDispatch();
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const { locationName, currentTemp } = useSelector(getLocationNameAndTemp);

  console.log(locationName, currentTemp);

  const handleLongPress = ({ coordinate }) => {
    setMarkerCoordinates(coordinate);

    const coordinates = R.compose(
      R.join(','),
      R.map(x => x.toFixed(4)),
      R.reverse,
      R.values
    )(coordinate);

    console.log(coordinates);

    dispatch(fetchLocationAndForecast(coordinates));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <Maps
            initialRegion={{
              latitude: 49.0139,
              longitude: 31.2858,
              latitudeDelta: 20,
              longitudeDelta: 9,
            }}
            showsUserLocation
            onLongPress={(e) => handleLongPress(e.nativeEvent)}
          >
            {markerCoordinates && (
              <Marker
                title="Test marker"
                coordinate={markerCoordinates}
              />)}
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