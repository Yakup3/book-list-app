import axios from 'axios';
import {ALL_BOOKS, DEFAULT_BASE_URL} from '../Api.constants';

export const fetchBookList = (query, limit, offset) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${DEFAULT_BASE_URL}search.json?q=${query}&fields=${ALL_BOOKS}&limit=${limit}&offset=${offset}`;

      axios
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
          console.log('Fetch book list Error: ', err);
        });
    } catch (err) {
      reject(err);
      console.log('fetchBookList catch Error: ', err);
    }
  });

export const fetchBookDetails = key =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${DEFAULT_BASE_URL}${key}.json`;

      axios
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
          console.log('Fetch book details Error: ', err);
        });
    } catch (err) {
      reject(err);
      console.log('fetchBookDetails catch Error: ', err);
    }
  });
