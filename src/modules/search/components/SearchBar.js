// @flow
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

type SearchBarProps = {
  locationName: string,
}

const SearchBar = ({ locationName }: SearchBarProps) => {
  const dispatch = useDispatch();
  const input = useRef(null);

  useEffect(() => {
    if (input.current && locationName) {
      input.current.setAddressText(locationName);
    }
  }, [locationName]);

  return (
    <Wrapper>
      <GooglePlacesAutocomplete
        ref={input}
        placeholder='Find a place for forecast'
        fetchDetails
        enablePoweredByContainer={false}
        onPress={(data, details) => {
          console.log(details);
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

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%;
  background-color: blue;
  z-index: 2;
`;

export default SearchBar;