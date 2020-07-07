import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SearchView from '@modules/search/views/SearchView';
import MapsView from '@modules/map/views/MapsView';

const AppStack = createStackNavigator(
  {
    Map: { screen: MapsView },
    Search: { screen: SearchView },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Map',
  }
);

export default createAppContainer(AppStack);
