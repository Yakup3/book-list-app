import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from '../types';

const initialState = {
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(book => book.key !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
