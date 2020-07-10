import React from 'react';
import { Callout } from 'react-native-maps';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { propOr } from 'ramda';

import { getUnitsType, TYPES } from '@modules/app/AppReducer';

import { getLocationInfo } from '../MapReducer';

type MarkerCalloutProps = {
  onCalloutPress: Function,
}

const MarkerCallout = ({ onCalloutPress }: MarkerCalloutProps) => {
  const location = useSelector(getLocationInfo);
  const unitsType = useSelector(getUnitsType);

  const currentWeather = propOr(null, 'currentWeather', location);

  if (currentWeather) {
    const temp = currentWeather.temp + (unitsType ===  TYPES.METRIC ? '°C' : '°F');
    const feelsLike = currentWeather.feelsLike + (unitsType ===  TYPES.METRIC ? '°C' : '°F');
    const locationName = `${location.name}, ${location.country}`;

    return (
      <StyledCallout tooltip onPress={() => onCalloutPress(locationName)}>
        <CalloutBody>
          <Wrapper>
            <IconWrapper>
              <IconText>
                {console.log(currentWeather.iconUrl)}
                <Icon resizeMode="cover" source={{ uri: currentWeather.iconUrl }} />
              </IconText>
            </IconWrapper>
            <InfoSection>
              <WeatherSection>
                <TempSection>
                  <TempContainer>
                    <LocationName>{locationName}</LocationName>
                    <Temperature>{temp}</Temperature>
                  </TempContainer>
                  <FeelsLikeContainer>
                    <FeelsLike>Feels like: {feelsLike}</FeelsLike>
                  </FeelsLikeContainer>
                </TempSection>
              </WeatherSection>
            </InfoSection>
          </Wrapper>
        </CalloutBody>
      </StyledCallout>
    );
  }

  return null;
};

const StyledCallout = styled(Callout)`
  width: 250px;
  height: 120px;
  align-self: flex-end;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 10px;
  background-color: green;
  border-radius: 20px;
`;

const IconWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const IconText = styled.Text`
  height: 100%;
  text-align: center;
`;

const Icon = styled.Image`
  height: 50px;
  width: 100px;
  align-self: center;
`;

const InfoSection = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

const WeatherSection = styled.View`
  flex-direction: row;
  flex: 1;
`;

const TempSection = styled.View`
  flex-direction: column;
  flex: 1;
`;

const TempContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Temperature = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: 700;
`;

const FeelsLikeContainer = styled.View`
  align-items: center;
`;

const FeelsLike = styled.Text``;

const CalloutBody = styled.View`
  border-radius: 20px;
  background-color: white;
  border: 1px solid black;
  flex: 1;
`;

const LocationName = styled.Text`

`;

export default MarkerCallout;