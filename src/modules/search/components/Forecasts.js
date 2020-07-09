import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { getForecasts, getIsLoading } from '@modules/search/SearchReducer';
import { getUnitsType, TYPES } from '@modules/app/AppReducer';

import Forecast from './Forecast';

const Forecasts = () => {
  const storeForecasts = useSelector(getForecasts);
  const unitsType = useSelector(getUnitsType);
  const isLoading = useSelector(getIsLoading);

  const [forecasts, setForecasts] = useState([]);

  const formateForecasts = (_forecasts, _unitsType) => {
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

    const formattedForecasts = _forecasts.map((item) => {
      item.temp += _unitsType === TYPES.METRIC ? celsius : fahrenheit;
      item.feelsLike += _unitsType === TYPES.METRIC ? celsius : fahrenheit;
      item.humidity += '%';
      item.windSpeed += _unitsType === TYPES.METRIC ? ' mps' : ' mph';
      item.uv = getUVLevel(item.uv);
      return item;
    });

    return formattedForecasts;
  }

  useEffect(() => {
    if (!isLoading) {
      setForecasts(formateForecasts(storeForecasts, unitsType));
    }
  }, [unitsType, storeForecasts, isLoading]);

  const keyExtractor = item => item.date;

  const renderItem = ({ item }) => <Forecast item={item} />;

  if (isLoading) {
    return null;
  }

  return (
    <Wrapper>
      <FlatList
        data={forecasts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: '50%',
          paddingHorizontal: '5%',
          paddingBottom: '10%',
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

export default Forecasts;