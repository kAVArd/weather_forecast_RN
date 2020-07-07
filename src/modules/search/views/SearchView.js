// @flow
import React from 'react';
import styled from 'styled-components';
import { StatusBar, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import Bar from '@components/Bar';

type SearchViewProps = {
  navigation: Object,
}

const SearchView = ({ navigation }: SearchViewProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <Text>Bye</Text>
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
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  width: 100%;
  text-align: center;
  color: red;
`;

export default SearchView;