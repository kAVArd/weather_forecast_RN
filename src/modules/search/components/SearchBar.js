/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import * as R from 'ramda';
import { StyleSheet } from 'react-native';

import { getUnitsType } from '@modules/app/AppReducer';
import Theme from '@components/Theme';
import search from '@components/Bar/assets/search.png';

import { fetchForecast } from '../SearchActions';

type SearchBarProps = {
  locationName: string,
  setCoordinates: Function,
  inputRef?: Object,
}

const inputStyle = StyleSheet.create({
  container: {
    width: '100%',
  },
  description: {
    color: Theme.borderColor,
  },
  listView: {
    backgroundColor: Theme.opacityGray,
  },
  textInput: {
    backgroundColor: Theme.gray,
    borderBottomColor: Theme.borderColor,
    borderBottomWidth: 1,
    color: Theme.borderColor,
    height: '70%',
  },
  textInputContainer: {
    backgroundColor: Theme.gray,
    height: 50,
    paddingHorizontal: '3%',
    width: '100%',
  },
})

const SearchBar = ({ locationName, setCoordinates, inputRef }: SearchBarProps) => {
  const dispatch = useDispatch();
  const unitsType = useSelector(getUnitsType);

  useEffect(() => {
    const current = R.prop('current', inputRef);
    if (current && locationName) {
      current.setAddressText(locationName);
    }
  }, [locationName]);

  const handleSelect = (details) => {
    const { lat, lng } = R.path(['geometry', 'location'], details);

    const location = { latitude: lat, longitude: lng };

    setCoordinates(location);

    dispatch(fetchForecast(location, unitsType));
  }

  const renderLeftButton = () => (
    <Button>
      <ButtonImage source={search} resizeMode='contain' />
    </Button>
  )

  return (
    <Wrapper>
      <GooglePlacesAutocomplete
        styles={inputStyle}
        ref={inputRef}
        placeholder='Find a place for forecast'
        fetchDetails
        renderLeftButton={renderLeftButton}
        enablePoweredByContainer={false}
        onPress={(data, details) => {
          handleSelect(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: '(cities)',
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
      />
    </Wrapper>
  );
};

SearchBar.defaultProps = {
  inputRef: null,
};

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 50px;
  z-index: 2;
`;

const Button = styled.View`
  width: 10%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.Image`
  width: 100%;
  height: 60%;
`;

export default SearchBar;