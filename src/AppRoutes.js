import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SearchView from '@modules/search/views/SearchView';
import MapView from '@modules/map/views/MapView';

const AppStack = createStackNavigator(
  {
    Map: { screen: MapView },
    Search: { screen: SearchView },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Map',
  }
);

export default createAppContainer(AppStack);
