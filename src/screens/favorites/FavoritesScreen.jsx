import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styles from './FavoritesScreen.style';
import {PAGES} from '../../shared/constants';
import {localStrings} from '../../shared/localization';
import BookItem from '../../shared/components/BookItem';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const {favorites} = useSelector(state => state.reducer);

  const handleOnPressBookItem = item => {
    navigation.navigate(PAGES.BOOKDETAILS, {book: item});
  };

  const renderHeader = () => (
    <Text style={styles.header}>{localStrings.favoritesList}</Text>
  );

  const renderFavorites = () => {
    return (
      favorites.length > 0 && (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <BookItem
              item={item}
              handleOnPressBookItem={handleOnPressBookItem}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.key}-${index}`}
          contentContainerStyle={styles.bookList}
          numColumns={2}
          key={2}
        />
      )
    );
  };

  const renderPlaceholder = () =>
    favorites.length == 0 && (
      <View style={styles.placeholderContainer}>
        <Image
          source={require('../../assets/nothing_found.png')}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>{localStrings.emptyMessage}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFavorites()}
      {renderPlaceholder()}
    </View>
  );
};

export default FavoritesScreen;
