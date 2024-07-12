import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './HomeScreen.style';
import colors from '../../theme/colors';
import {PAGES} from '../../shared/constants';
import {localStrings} from '../../shared/localization';
import BookItem from '../../shared/components/BookItem';
import {fetchBookList} from '../../services/api/requests';
import BookItemListView from '../../shared/components/BookItemListView';
import DisplayOptionIcon from '../../shared/components/DisplayOptionIcon';
import {useDispatch} from 'react-redux';
import {changeItemDisplay} from '../../services/redux/actions';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [searchResultCount, setSearchResultCount] = useState(-1);

  const navigation = useNavigation();

  const fetchBooks = useCallback(
    (query, append = false) => {
      if (!loading && !isLoadingMore) {
        append ? setIsLoadingMore(true) : setLoading(true);

        fetchBookList(query, limit, append ? offset : 0)
          .then(res => {
            setBooks(prevBooks =>
              append ? [...prevBooks, ...res.docs] : res.docs,
            );
            setOffset(prevOffset => prevOffset + limit);
            setSearchResultCount(res.numFound);
          })
          .catch(err => {
            console.error('Error in fetch books:', err);
          })
          .finally(() => {
            append ? setIsLoadingMore(false) : setLoading(false);
          });
      }
    },
    [loading, isLoadingMore, offset, limit],
  );

  const handleOnPressBookItem = item => {
    navigation.navigate(PAGES.BOOKDETAILS, {book: item});
  };

  const handleSearchIconPress = useCallback(() => {
    if (searchQuery.length > 2) {
      setIsSearchIcon(false);
      fetchBooks(searchQuery);
    }
  }, [searchQuery, fetchBooks]);

  const handleClearIconPress = useCallback(() => {
    if (!loading && !isLoadingMore) {
      setSearchQuery('');
      setBooks([]);
      setIsSearchIcon(true);
      setOffset(0);
      setSearchResultCount(-1);
    }
  }, [loading, isLoadingMore]);

  const handleLoadMoreBooks = useCallback(() => {
    if (!isLoadingMore && books.length < searchResultCount) {
      fetchBooks(searchQuery, true);
    }
  }, [isLoadingMore, books, searchResultCount, fetchBooks, searchQuery]);

  const renderSearchBar = useCallback(
    () => (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={localStrings.searchForBooks}
          value={searchQuery}
          placeholderTextColor={colors.brown.medium}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={isSearchIcon ? handleSearchIconPress : handleClearIconPress}
          style={styles.iconContainer}>
          <Icon
            name={isSearchIcon ? 'search1' : 'close'}
            size={22}
            color={colors.brown.dark}
          />
        </TouchableOpacity>
      </View>
    ),
    [searchQuery, isSearchIcon, handleSearchIconPress, handleClearIconPress],
  );

  const dispatch = useDispatch();

  const renderDisplayOptionIcons = useCallback(() => {
    return (
      <View style={styles.displayOptionIcons}>
        <DisplayOptionIcon
          name={'format-list-bulleted'}
          size={22}
          color={colors.brown.medium}
          isActive={!isCardView}
          handleOnPressIcon={() => {
            dispatch(changeItemDisplay(!isCardView));
            setIsCardView(prevState => !prevState);
          }}
        />
        <DisplayOptionIcon
          name={'cards-variant'}
          size={22}
          color={colors.brown.medium}
          isActive={isCardView}
          handleOnPressIcon={() => {
            dispatch(changeItemDisplay(!isCardView));
            setIsCardView(prevState => !prevState);
          }}
        />
      </View>
    );
  }, [isCardView]);

  const renderSearchResultCountContainer = useCallback(
    () => (
      <View style={styles.searchResultCountContainer}>
        <Text style={styles.searchResultCount}>
          {`${localStrings.searchResult}: ${
            searchResultCount !== -1
              ? books.length + ' / ' + searchResultCount
              : '-'
          }`}
        </Text>
        {renderDisplayOptionIcons()}
      </View>
    ),
    [books.length, searchResultCount, renderDisplayOptionIcons],
  );

  const renderBookList = useCallback(
    () =>
      !loading &&
      books.length > 0 && (
        <FlatList
          data={books}
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
          numColumns={isCardView ? 2 : 1}
          key={isCardView ? 2 : 1}
          onEndReached={handleLoadMoreBooks}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() =>
            isLoadingMore && (
              <ActivityIndicator animating={true} color={colors.brown.medium} />
            )
          }
        />
      ),
    [
      loading,
      books,
      isCardView,
      isLoadingMore,
      handleOnPressBookItem,
      handleLoadMoreBooks,
    ],
  );

  const renderPlaceholder = useCallback(
    () =>
      !loading &&
      books.length === 0 && (
        <View style={styles.placeholderContainer}>
          <Image
            source={require('../../assets/book_search.png')}
            style={styles.placeholderImage}
          />
          <Text style={styles.placeholderText}>
            {localStrings.findYourBookOfChoice}
          </Text>
        </View>
      ),
    [loading, books],
  );

  const renderActivityIndicator = useCallback(
    () =>
      loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          animating={true}
          color={colors.brown.medium}
        />
      ),
    [loading],
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderSearchResultCountContainer()}
      {renderBookList()}
      {renderPlaceholder()}
      {renderActivityIndicator()}
    </View>
  );
};

export default HomeScreen;
