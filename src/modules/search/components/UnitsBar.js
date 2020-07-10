import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getUnitsType, TYPES } from '@modules/app/AppReducer';
import { setUnitsType } from '@modules/app/AppActions';

const UnitsBar = () => {
  const dispatch = useDispatch();
  const unitsType = useSelector(getUnitsType);

  const handleSelectUnits = (type) => dispatch(setUnitsType(type));

  const isMetricActive = unitsType === TYPES.METRIC;

  return (
    <Wrapper>
      <Title>Units</Title>
      <Container>
        <ButtonContainer>
          <Button onPress={handleSelectUnits.bind(null, TYPES.METRIC)} isActive={isMetricActive}>
            <ButtonText isActive={isMetricActive}>Europe</ButtonText>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onPress={handleSelectUnits.bind(null, TYPES.IMPERIAL)} isActive={!isMetricActive}>
            <ButtonText isActive={!isMetricActive}>American</ButtonText>
          </Button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: column;
  min-height: 80px;
  height: 10%;
  width: 100%;
  padding: 1%;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  /* color: ${props => props.theme.borderColor}; */
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 2%;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  ${props => !props.isActive && `border: 1px solid ${props.theme.gray}`};
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${props => props.isActive && `background-color: ${props.theme.opacityGray}`};
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 900;
  ${props => props.isActive && `color: ${props.theme.orange}`}
`;

export default UnitsBar;