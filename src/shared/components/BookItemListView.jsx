import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  DEFAULT_COVER_IMAGE_URL,
  DEFAULT_BASE_COVER_IMAGE_URL,
} from '../../services/api/Api.constants';
import colors from '../../theme/colors';
import {ScreenHeight, ScreenWidth} from '../constants';

const BookItemListView = React.memo(({item, handleOnPressBookItem}) => {
  const handleOnNavigateToDetails = () => {
    handleOnPressBookItem(item);
  };

  const renderBookCover = () => {
    return (
      <Image
        source={{
          uri: item.cover_i
            ? DEFAULT_BASE_COVER_IMAGE_URL(item.cover_i)
            : DEFAULT_COVER_IMAGE_URL,
        }}
        style={styles.bookCover}
      />
    );
  };

  const renderTextContainer = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1} ellipsizeMode="tail">
          {item.author_name?.[0]}
        </Text>
      </View>
    );
  };

  const renderRightIcon = () => {
    return <Icon name="right" style={styles.icon} />;
  };

  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={handleOnNavigateToDetails}>
      {renderBookCover()}
      {renderTextContainer()}
      {renderRightIcon()}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  bookItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brown.dark,
  },
  bookCover: {
    width: ScreenWidth * 0.2,
    height: ScreenHeight * 0.12,
    marginRight: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.black,
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: colors.brown.medium,
  },
  icon: {
    fontSize: 24,
    color: colors.brown.dark,
  },
});

export default BookItemListView;
