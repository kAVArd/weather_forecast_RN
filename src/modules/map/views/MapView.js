// @flow
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { StatusBar, SafeAreaView } from 'react-native';

import Bar from '@components/Bar';

type MapViewProps = {
  navigation: Object,
}

const MapView = ({ navigation }: MapViewProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Screen>
          <Text>Hello</Text>
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

const Text = styled.Text`
  width: 100%;
  text-align: center;
  color: blue;
`;

export default MapView;