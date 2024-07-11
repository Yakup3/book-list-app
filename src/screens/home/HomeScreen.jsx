import React, {useState} from 'react';
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

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [searchResultCount, setSearchResultCount] = useState();

  const navigation = useNavigation();

  const fetchBooks = (query, append = false) => {
    if (!loading && !isLoadingMore) {
      append ? setIsLoadingMore(true) : setLoading(true);

      fetchBookList(query, limit, append ? offset : 0)
        .then(res => {
          setBooks(append ? [...books, ...res.docs] : res.docs);
          setOffset(prevOffset => prevOffset + limit);
          setSearchResultCount(res.numFound);
        })
        .catch(err => {
          console.log('error in fetch books');
        })
        .finally(() => {
          append ? setIsLoadingMore(false) : setLoading(false);
        });
    }
  };

  const handleOnPressBookItem = item => {
    navigation.navigate(PAGES.BOOKDETAILS, {book: item});
  };

  const handleSearchIconPress = () => {
    if (searchQuery.length > 2) {
      setIsSearchIcon(false);
      setOffset(0);
      fetchBooks(searchQuery);
    }
  };

  const handleClearIconPress = () => {
    if (!loading && !isLoadingMore) {
      setSearchQuery('');
      setBooks([]);
      setIsSearchIcon(true);
      setOffset(0);
    }
  };

  const handleLoadMoreBooks = () => {
    if (!isLoadingMore && books.length < searchResultCount) {
      fetchBooks(searchQuery, true);
    }
  };

  const renderSearchBar = () => (
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
  );

  const renderSearchResultCount = () =>
    !loading &&
    books.length > 0 && (
      <Text
        style={
          styles.searchResultCount
        }>{`${localStrings.searchResult}: ${books.length} / ${searchResultCount}`}</Text>
    );

  const renderBookList = () =>
    !loading &&
    books.length > 0 && (
      <FlatList
        data={books}
        renderItem={({item}) => (
          <BookItem item={item} handleOnPressBookItem={handleOnPressBookItem} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        contentContainerStyle={styles.bookList}
        numColumns={2}
        key={2}
        onEndReached={handleLoadMoreBooks}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>
          isLoadingMore && (
            <ActivityIndicator animating={true} color={colors.brown.medium} />
          )
        }
      />
    );

  const renderPlaceholder = () =>
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
    );

  const renderActivityIndicator = () =>
    loading && (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        animating={true}
        color={colors.brown.medium}
      />
    );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderSearchResultCount()}
      {renderBookList()}
      {renderPlaceholder()}
      {renderActivityIndicator()}
    </View>
  );
};

export default HomeScreen;
