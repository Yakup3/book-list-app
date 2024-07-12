import {
  ADD_TO_FAVORITES,
  CHANGE_ITEM_DISPLAY,
  REMOVE_FROM_FAVORITES,
} from '../types';

export const addToFavorites = book => ({
  type: ADD_TO_FAVORITES,
  payload: book,
});

export const removeFromFavorites = bookId => ({
  type: REMOVE_FROM_FAVORITES,
  payload: bookId,
});

export const changeItemDisplay = isCardView => ({
  type: CHANGE_ITEM_DISPLAY,
  payload: isCardView,
});
