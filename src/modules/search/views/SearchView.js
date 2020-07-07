import React from 'react';
import styled from 'styled-components';

import { StatusBar, SafeAreaView } from 'react-native';

const SearchView = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Screen>
        <Text>Bye</Text>
      </Screen>
    </SafeAreaView>
  </>
);

const Screen = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  width: 100%;
  text-align: center;
  color: red;
`;

export default SearchView;