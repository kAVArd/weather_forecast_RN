import React from 'react';
import styled from 'styled-components';

import arrowUp from '../assets/arrowUp.png';
import arrowDown from '../assets/arrowDown.png';
import water from '../assets/water.png';
import wind from '../assets/wind.png';
import sun from '../assets/sun.png';

const Forecast = ({ item }) => (
  <Container>
    <Date>{item.date}</Date>
    <Wrapper>
      <IconWrapper>
        <Icon resizeMode="contain" source={{ uri: item.iconUrl }} />
      </IconWrapper>
      <InfoSection>
        <WeatherSection>
          <TempSection>
            <TempContainer>
              <Temperature>{item.temp}</Temperature>
            </TempContainer>
            <FeelsLikeContainer>
              <FeelsLike>Feels like: {item.feelsLike}</FeelsLike>
            </FeelsLikeContainer>
            <DiffSection>
              <DiffTempSec>
                <DiffTempImage source={arrowDown} />
                <DiffTempText>{item.minTemp}</DiffTempText>
              </DiffTempSec>
              <DiffTempSec>
                <DiffTempImage source={arrowUp} />
                <DiffTempText>{item.maxTemp}</DiffTempText>
              </DiffTempSec>
            </DiffSection>
          </TempSection>
          <AdditionSection>
            <InfoRow>
              <InfoIconWrapper>
                <InfoIcon source={water} resizeMode="contain" />
              </InfoIconWrapper>
              <InfoTextWrapper>
                <InfoText>{item.humidity}</InfoText>
              </InfoTextWrapper>
            </InfoRow>
            <InfoRow>
              <InfoIconWrapper>
                <InfoIcon source={wind} resizeMode="contain" />
              </InfoIconWrapper>
              <InfoTextWrapper>
                <InfoText>{item.windSpeed}</InfoText>
              </InfoTextWrapper>
            </InfoRow>
            <InfoRow>
              <InfoIconWrapper>
                <InfoIcon source={sun} resizeMode="contain" />
              </InfoIconWrapper>
              <InfoTextWrapper>
                <InfoText>{item.uv}</InfoText>
              </InfoTextWrapper>
            </InfoRow>
          </AdditionSection>
        </WeatherSection>
      </InfoSection>
    </Wrapper>
  </Container>
);

const Container = styled.View`
  width: 100%;
  height: 150px;
  padding: 10px;
  background-color: green;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex: 1;
`;

const IconWrapper = styled.View`
  flex: 1;
`;

const Icon = styled.Image`
  height: 100%;
  width: 100%;
`;

const InfoSection = styled.View`
  flex: 3;
  height: 100%;
  flex-direction: column;
`;

const Date = styled.Text`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const WeatherSection = styled.View`
  flex-direction: row;
  flex: 1;
`;

const TempSection = styled.View`
  flex-direction: column;
  flex: 1;
`;

const AdditionSection = styled.View`
  flex: 1;
  flex-direction: column;
`;

const InfoRow = styled.View`
  flex-direction: row;
  flex: 1;
`;

const InfoIconWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InfoIcon = styled.Image`
  width: 90%;
  height: 90%;
`;

const InfoTextWrapper = styled.View`
  align-items: flex-start;
  justify-content: center;
  flex: 2;
`;

const InfoText = styled.Text`
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

const DiffSection = styled.View`
  flex-direction: row;
  flex: 1;
`;

const DiffTempSec = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DiffTempImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const DiffTempText = styled.Text``;

export default Forecast;