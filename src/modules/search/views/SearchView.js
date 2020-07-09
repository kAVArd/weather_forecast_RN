// @flow
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatusBar, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { pathOr } from 'ramda';

import Bar from '@components/Bar';
import { changeActiveTab } from '@modules/app/AppActions';
import { getUnitsType } from '@modules/app/AppReducer'; 

import SearchBar from '../components/SearchBar';
import Forecasts from '../components/Forecasts';

import { fetchForecast } from '../SearchActions';

type SearchViewProps = {
  navigation: Object,
}

const SearchView = ({ navigation }: SearchViewProps) => {
  const dispatch = useDispatch();
  const unitsType = useSelector(getUnitsType);
  const [locationName, setLocationName] = useState('');

  const _locationName = pathOr(null, ['state', 'params', 'locationName'], navigation);
  const coordinates = pathOr(null, ['state', 'params', 'coordinates'], navigation);

  useEffect(() => {
    dispatch(changeActiveTab({ tabName: 'search' }));

    if (coordinates) {
      dispatch(fetchForecast(coordinates, unitsType));
    }

    if (_locationName) {
      setLocationName(_locationName);
    }
  }, []);



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <SearchBar locationName={locationName} />
          <Forecasts />
          <Bar
            dispatch={dispatch}
            navigation={navigation}
          />
        </Screen>
      </SafeAreaView>
    </>
  )
};

const Screen = styled.View`
  width: 100%;
  height: 100%;
  background-color: blue;
`;

export default SearchView;