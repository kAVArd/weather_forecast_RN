import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getActiveTab, TABS } from '@modules/app/AppReducer';
import { changeActiveTab } from '@modules/app/AppActions';

import map from './assets/map.png';
import mapActive from './assets/mapActive.png';
import search from './assets/search.png';
import searchActive from './assets/searchActive.png';

type BarProps = {
  dispatch: Function,
  navigation: Object,
  duplicatePressSearch?: Function,
}

const Bar = ({ dispatch, navigation, duplicatePressSearch }: BarProps) => {
  const activeTab = useSelector(getActiveTab);

  const handleChangeTab = (tabName) => {
    if ((activeTab === 'search' && tabName === 'search')) {
      duplicatePressSearch();
    }
    const route = tabName === TABS.MAP ? 'Map' : 'Search';
  
    navigation.navigate(route);

    dispatch(changeActiveTab({ tabName }));
  }

  const isMapActive = activeTab === TABS.MAP;

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          onPress={handleChangeTab.bind(null, TABS.MAP)}
          isActive={isMapActive}
        >
          <ButtonImage source={isMapActive ? mapActive : map} resizeMode='contain' />
          <ButtonTitle isActive={isMapActive}>Map</ButtonTitle>
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onPress={handleChangeTab.bind(null, TABS.SEARCH)}
          isActive={!isMapActive}
        >
          <ButtonImage source={!isMapActive ? searchActive : search} resizeMode='contain' />
          <ButtonTitle isActive={!isMapActive}>Search</ButtonTitle>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

Bar.defaultProps = {
  duplicatePressSearch: () => {},
}

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  height: 8%;
  background-color: ${props => props.theme.gray};
  min-height: 60px;
`;

const ButtonWrapper = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1%;
`;

const Button = styled.TouchableOpacity`
  width: 60%;
  height: 100%;
  /* background-color: ${props => props.isActive ? props.theme.lightGray : 'transparent'}; */
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonImage = styled.Image`
  height: 60%;
`;

const ButtonTitle = styled.Text`
  font-size: 15px;
  color: ${props => props.isActive ? props.theme.orange : props.theme.textLightGray};
  font-weight: bold;
`;

export default Bar;
