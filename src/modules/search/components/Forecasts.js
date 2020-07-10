import React from 'react';
import styled from 'styled-components';
import { FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { getForecasts, getIsLoading } from '@modules/search/SearchReducer';
import { getUnitsType, TYPES } from '@modules/app/AppReducer';
import Theme from '@components/Theme';

import Forecast from './Forecast';

const celsius = '°C';
const fahrenheit = '°F';

const getUVLevel = (uv) => {
  if (uv >= 1 && uv < 3) return 'Low';
  if (uv >= 3 && uv < 6) return 'Moderate';
  if (uv >= 6 && uv < 8) return 'Hight';
  if (uv >= 8 && uv < 11) return 'Very High';
  if (uv >= 11) return 'Extreme';

  return 'Normal';
};

const Forecasts = () => {
  const forecasts = useSelector(getForecasts);
  const unitsType = useSelector(getUnitsType);
  const isLoading = useSelector(getIsLoading);

  const keyExtractor = item => item.date;

  const renderItem = ({ item }) => <Forecast item={item} />;

  if (isLoading) {
    return (
      <Wrapper>
        <Spinner>
          <ActivityIndicator size='large' color={Theme.orange} />
        </Spinner>
      </Wrapper>
    );
  }

  const formattedForecasts = forecasts.map((item) => {
    if (typeof item.uv === 'string') { return item; }
    item.temp += unitsType === TYPES.METRIC ? celsius : fahrenheit;
    item.feelsLike += unitsType === TYPES.METRIC ? celsius : fahrenheit;
    item.humidity += '%';
    item.windSpeed += unitsType === TYPES.METRIC ? ' mps' : ' mph';
    item.uv = getUVLevel(item.uv);
    return item;
  });

  return (
    <Wrapper>
      <FlatList
        data={formattedForecasts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingHorizontal: '5%',
          paddingBottom: '5%',
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.textLightGray};
  z-index: 0;
`;

const Spinner = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default Forecasts;