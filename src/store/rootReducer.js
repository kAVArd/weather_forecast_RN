import { combineReducers } from 'redux';

import MapReducer, { STATE_KEY as MAP_STATE_KEY } from '@modules/map/MapReducer';
import SearchReducer, { STATE_KEY as SEARCH_STATE_KEY } from '@modules/search/SearchReducer';

const rootReducer = combineReducers({
  [MAP_STATE_KEY]: MapReducer,
  [SEARCH_STATE_KEY]: SearchReducer,
});

export default rootReducer;