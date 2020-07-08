import { SET_SEARCH_TEXT } from './SearchActions';
import * as R from 'ramda';

export const STATE_KEY = 'search';

const initState = {
  searchText: null,
}

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      const text = R.path(['payload', 'text'], action);

      return R.assoc('searchText', text, state);
    }
    default: { return state; }
  }
};

export const getSearchText = state => R.path([STATE_KEY, 'searchText'], state);

export default SearchReducer;