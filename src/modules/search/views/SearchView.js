// @flow
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { pathOr, propOr } from 'ramda';

import Bar from '@components/Bar';
import { changeActiveTab } from '@modules/app/AppActions';
import { getUnitsType } from '@modules/app/AppReducer'; 

import SearchBar from '../components/SearchBar';
import Forecasts from '../components/Forecasts';
import UnitsBar from '../components/UnitsBar';

import { fetchForecast, clearForecast } from '../SearchActions';
import { fetchCurrentWeather } from '@modules/map/MapActions';

type SearchViewProps = {
  navigation: Object,
}

const SearchView = ({ navigation }: SearchViewProps) => {
  const dispatch = useDispatch();
  const unitsType = useSelector(getUnitsType);
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const inputRef = useRef(null);

  const _locationName = pathOr(null, ['state', 'params', 'locationName'], navigation);
  const _coordinates = pathOr(null, ['state', 'params', 'coordinates'], navigation);


  const clearText = () => {
    const current = propOr(null, 'current', inputRef);
    if (current) {
      current.setAddressText('');
    }
  };

  const duplicatePressSearch = () => {
    clearText();
    dispatch(clearForecast());
  }

  useEffect(() => {
    dispatch(changeActiveTab({ tabName: 'search' }));

    if (_coordinates) {
      dispatch(fetchForecast(_coordinates, unitsType));
      setCoordinates(_coordinates);
    }

    if (_locationName) {
      setLocationName(_locationName);
    }
  }, []);

  useEffect(() => {
    if(coordinates) {
      dispatch(fetchForecast(coordinates, unitsType));
      dispatch(fetchCurrentWeather(coordinates, unitsType));
    }
  }, [unitsType]);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <SearchBar locationName={locationName} setCoordinates={setCoordinates} inputRef={inputRef} />
          <View style={{ height: 50 }} />
          <UnitsBar />
          <Forecasts
            dispatch={dispatch}
            coordinates={coordinates}
          />
          <Bar
            dispatch={dispatch}
            navigation={navigation}
            duplicatePressSearch={duplicatePressSearch}
          />
        </Screen>
      </SafeAreaView>
    </>
  )
};

const Screen = styled.View`
  width: 100%;
  height: 100%;
`;

export default SearchView;