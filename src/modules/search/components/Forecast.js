import React from 'react';
import styled from 'styled-components';

const Forecast = ({ item }) => (
  <Wrapper>
    <IconWrapper>
      <Icon resizeMode="contain" source={{ uri: item.icon }} />
    </IconWrapper>
    <InfoSection>
      <Date>{item.date}</Date>
      <WeatherSection>
        <TempSection>
          <Temperature>{item.temp}</Temperature>
        </TempSection>
        <AdditionSection />
      </WeatherSection>
    </InfoSection>
  </Wrapper>
);

const Wrapper = styled.View`
  width: 100%;
  height: 150px;
  padding: 10px;
  flex-direction: row;
  background-color: green;
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  margin-bottom: 10px;
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
  flex-direction: column;
`;

const Date = styled.Text`
  font-size: 20px;
  font-weight: 700;
  border-width: 1px;
  border-color: red;
`;

const WeatherSection = styled.View`
  flex-direction: row;
  border: 1px solid blue;
`;

const TempSection = styled.View`
  flex-direction: column;
  border: 1px solid yellow;
  flex: 1;
`;

const AdditionSection = styled.View`
  flex: 1;
`;

const Temperature = styled.Text`
  font-size: 50px;
  color: white;
  font-weight: 700;
`;

export default Forecast;