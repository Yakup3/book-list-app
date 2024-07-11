import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {
  DEFAULT_COVER_IMAGE_URL,
  DEFAULT_BASE_COVER_IMAGE_URL,
} from '../../services/api/Api.constants';
import colors from '../../theme/colors';
import {ScreenHeight, ScreenWidth} from '../constants';

const BookItem = ({item, handleOnPressBookItem}) => {
  const handleOnNavigateToDetails = () => {
    handleOnPressBookItem(item);
  };

  const renderBookCover = () => (
    <Image
      source={{
        uri: item.cover_i
          ? DEFAULT_BASE_COVER_IMAGE_URL(item.cover_i)
          : DEFAULT_COVER_IMAGE_URL,
      }}
      style={styles.bookCover}
    />
  );

  const renderTextContainer = () => (
    <View style={styles.textContainer}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author_name?.[0]}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={handleOnNavigateToDetails}>
      {renderBookCover()}
      {renderTextContainer()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flex: 1 / 2,
    margin: 5,
    padding: 10,
    borderRadius: 8,
  },
  bookCover: {
    width: ScreenWidth * 0.35,
    height: ScreenHeight * 0.25,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.text.black,
  },
  bookAuthor: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    color: colors.brown.medium,
  },
});

export default BookItem;
