import React, {useCallback} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styles from './FavoritesScreen.style';
import {PAGES} from '../../shared/constants';
import {localStrings} from '../../shared/localization';
import BookItem from '../../shared/components/BookItem';
import BookItemListView from '../../shared/components/BookItemListView';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const {favorites, isCardView} = useSelector(state => state.reducer);

  const handleOnPressBookItem = item => {
    navigation.navigate(PAGES.BOOKDETAILS, {book: item});
  };

  const renderHeader = useCallback(
    () => <Text style={styles.header}>{localStrings.favoritesList}</Text>,
    [],
  );

  const renderFavorites = useCallback(
    () => (
      <FlatList
        data={favorites}
        renderItem={({item}) =>
          isCardView ? (
            <BookItem
              item={item}
              handleOnPressBookItem={handleOnPressBookItem}
            />
          ) : (
            <BookItemListView
              item={item}
              handleOnPressBookItem={handleOnPressBookItem}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        contentContainerStyle={styles.bookList}
        numColumns={2}
        key={2}
      />
    ),
    [favorites, isCardView, handleOnPressBookItem],
  );

  const renderPlaceholder = useCallback(
    () => (
      <View style={styles.placeholderContainer}>
        <Image
          source={require('../../assets/nothing_found.png')}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>{localStrings.emptyMessage}</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {favorites.length > 0 ? renderFavorites() : renderPlaceholder()}
    </View>
  );
};

export default FavoritesScreen;
