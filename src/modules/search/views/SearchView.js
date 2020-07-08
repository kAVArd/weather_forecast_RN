// @flow
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StatusBar, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import Bar from '@components/Bar';
import { changeActiveTab } from '@modules/app/AppActions';

import SearchBar from '../components/SearchBar';
import Forecasts from '../components/Forecasts';

type SearchViewProps = {
  navigation: Object,
}

const SearchView = ({ navigation }: SearchViewProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveTab({ tabName: 'search' }));
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <SearchBar />
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