import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { getForecasts } from '@modules/map/MapReducer';
import { getFilters, TEMP_UNITS, SPEED_UNITS } from '@modules/app/AppReducer';
import Forecast from './Forecast';

const Forecasts = () => {
  const forecasts = useSelector(getForecasts);
  const filters = useSelector(getFilters);

  const filteredForecasts = forecasts.map(item => {
    const icon = `http:${R.path(['day', 'condition', 'icon'], item)}`;

    const date = R.compose(
      (d) => moment(d).format('DD.MM'),
      R.prop('date')
    )(item);

    const tempFilter = R.prop('temp', filters);
    const speedFilter = R.prop('speed', filters);

    const temp = R.path(['day', `avgtemp_${tempFilter}`], item);

    const minTemp = R.path(['day', `mintemp_${tempFilter}`], item);
    const maxTemp = R.path(['day', `maxtemp_${tempFilter}`], item);

    const rainChance = R.path(['day', 'daily_chance_of_rain'], item);

    const windSpeed = R.path(['day', `maxwind_${speedFilter}`], item);


    const uv = R.path(['day', 'uv'], item);
  
    return {
      icon,
      date,
      temp: `${Math.round(temp)}°${tempFilter.toUpperCase()}`,
      minTemp,
      maxTemp,
      rainChance,
      windSpeed,
      uv,
    }
  })

  const keyExtractor = item => item.date;

  const renderItem = ({ item }) => <Forecast item={item} />;

  return (
    <Wrapper>
      <FlatList
        data={filteredForecasts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: '50%',
          paddingHorizontal: '5%',
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