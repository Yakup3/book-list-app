import {
  ADD_TO_FAVORITES,
  CHANGE_ITEM_DISPLAY,
  REMOVE_FROM_FAVORITES,
} from '../types';

const initialState = {
  favorites: [],
  isCardView: true,
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
    case CHANGE_ITEM_DISPLAY:
      return {
        ...state,
        isCardView: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
