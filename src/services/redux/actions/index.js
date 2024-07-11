import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from '../types';

export const addToFavorites = book => ({
  type: ADD_TO_FAVORITES,
  payload: book,
});

export const removeFromFavorites = bookId => ({
  type: REMOVE_FROM_FAVORITES,
  payload: bookId,
});
