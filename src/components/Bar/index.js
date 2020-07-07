// @flow
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getActiveTab, TABS } from '@modules/app/AppReducer';
import { changeActiveTab } from '@modules/app/AppActions';

type BarProps = {
  dispatch: Function,
  navigation: Object,
}

const Bar = ({ dispatch, navigation }: BarProps) => {
  const activeTab = useSelector(getActiveTab);

  const handleChangeTab = (tabName) => {
    const route = tabName === TABS.MAP ? 'Map' : 'Search';
  
    navigation.navigate(route);

    dispatch(changeActiveTab({ tabName }));
  }

  return (
    <Wrapper>
      <Button
        onPress={handleChangeTab.bind(null, TABS.MAP)}
        isActive={activeTab === TABS.MAP}
      >
        <ButtonTitle>Map</ButtonTitle>
      </Button>
      <Button
        onPress={handleChangeTab.bind(null, TABS.SEARCH)}
        isActive={activeTab === TABS.SEARCH}
      >
        <ButtonTitle>Search</ButtonTitle>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  min-height: 40px;
  position: absolute;
  bottom: 0;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isActive ? 'green' : 'white'};
`;

const ButtonTitle = styled.Text`
  font-size: 14px;
  color: red;
`;

export default Bar;
