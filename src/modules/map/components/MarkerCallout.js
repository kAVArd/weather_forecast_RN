// @flow
import React from 'react';
import { Callout } from 'react-native-maps';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getCurrentInfo } from '../MapReducer';

type MarkerCalloutProps = {
  onCalloutPress: Function,
}

const MarkerCallout = ({ onCalloutPress }: MarkerCalloutProps) => {
  const { location, currentWeather } = useSelector(getCurrentInfo);

  const locationName = `${location.name}, ${location.country}`

  if (currentWeather) {
    return (
      <Callout tooltip onPress={() => onCalloutPress(locationName)}>
        <CalloutBody>
          <Text>{`${locationName} ${currentWeather.temp_c}`}</Text>
        </CalloutBody>
      </Callout>
    );
  }

  return null;
};

const CalloutBody = styled.View`
  border-radius: 20px;
  background-color: white;
  width: 140px;
  height: 100px;
  padding: 10%;
`;

const Text = styled.Text``;

export default MarkerCallout;