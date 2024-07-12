import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

import styles from './BookDetailsScreen.style';
import colors from '../../theme/colors';
import {localStrings} from '../../shared/localization';
import {fetchBookDetails} from '../../services/api/requests';
import {
  DEFAULT_BASE_COVER_IMAGE_URL,
  DEFAULT_COVER_IMAGE_URL,
} from '../../services/api/Api.constants';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../services/redux/actions';

const TOP_TAB_BARS = {
  DESCRIPTION: 'description',
  ADDITIONAL_DETAILS: 'additionalDetails',
};

const BookDetailsScreen = () => {
  const route = useRoute();
  const {book} = route.params;
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState(book);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TOP_TAB_BARS.DESCRIPTION);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector(state => state.reducer.favorites);

  useEffect(() => {
    _fetchBookDetails();
  }, []);

  const _fetchBookDetails = useCallback(() => {
    setLoading(true);
    fetchBookDetails(bookDetails.key)
      .then(res => {
        setBookDetails(prevDetails => ({
          ...prevDetails,
          description:
            typeof res.description === 'object'
              ? res.description?.value
              : res.description,
          subjects: res.subjects,
          subject_times: res.subject_times,
          subject_places: res.subject_places,
          subject_people: res.subject_people,
        }));
      })
      .catch(err => {
        console.error('Error in fetching book details:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookDetails.key]);

  const prepareDetailsData = useMemo(
    () => [
      {label: localStrings.publishYear, value: bookDetails.first_publish_year},
      {label: localStrings.review, value: bookDetails.ratings_count},
      {
        label: localStrings.rating,
        value: bookDetails.ratings_average?.toFixed(1),
      },
    ],
    [bookDetails],
  );

  const prepareAddtionalsDetailsData = useMemo(
    () => [
      {label: localStrings.wantToRead, value: bookDetails.want_to_read_count},
      {
        label: localStrings.currentlyReading,
        value: bookDetails.currently_reading_count,
      },
      {label: localStrings.haveRead, value: bookDetails.already_read_count},
      {label: localStrings.publisher, value: bookDetails?.publisher?.[0] || ''},
      {label: localStrings.language, value: bookDetails.language?.join(', ')},
      {label: localStrings.subjects, value: bookDetails.subjects?.join(', ')},
      {
        label: localStrings.people,
        value: bookDetails.subject_people?.join(', '),
      },
      {
        label: localStrings.places,
        value: bookDetails.subject_places?.join(', '),
      },
      {label: localStrings.times, value: bookDetails.subject_times?.join(', ')},
    ],
    [bookDetails],
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const isBookInFavorites = useMemo(() => {
    return favorites.some(book => book.key === bookDetails.key);
  }, [favorites, bookDetails.key]);

  const handleHeartPress = useCallback(() => {
    if (isBookInFavorites) {
      dispatch(removeFromFavorites(bookDetails.key));
      setIsSnackbarVisible(true);
      setSnackbarMessage(localStrings.removeFromFavorites);
    } else {
      dispatch(addToFavorites(bookDetails));
      setIsSnackbarVisible(true);
      setSnackbarMessage(localStrings.addedToFavorites);
    }
  }, [isBookInFavorites, dispatch, bookDetails]);

  const renderHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.iconContainer}>
          <Icon name="arrowleft" size={22} color={colors.brown.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{localStrings.bookDetails}</Text>
        <TouchableOpacity
          onPress={handleHeartPress}
          style={styles.iconContainer}>
          <Icon
            name={isBookInFavorites ? 'heart' : 'hearto'}
            size={22}
            color={colors.brown.dark}
          />
        </TouchableOpacity>
      </View>
    ),
    [handleBackPress, handleHeartPress, isBookInFavorites],
  );

  const renderBookInfo = useCallback(
    () => (
      <View style={styles.bookInfoContainer}>
        <Image
          source={{
            uri: bookDetails.cover_i
              ? DEFAULT_BASE_COVER_IMAGE_URL(bookDetails.cover_i)
              : DEFAULT_COVER_IMAGE_URL,
          }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{bookDetails.title}</Text>
        <Text style={styles.bookAuthor}>
          {bookDetails.author_name?.join(', ')}
        </Text>
        <View style={styles.detailsBox}>
          {prepareDetailsData.map((item, index) => (
            <View style={styles.detailsBoxItem} key={index}>
              <Text style={styles.detailsTextLabel}>{item.label}</Text>
              <Text style={styles.detailsText}>{item.value || '-'}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    [bookDetails, prepareDetailsData],
  );

  const renderTopBar = useCallback(
    () => (
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === TOP_TAB_BARS.DESCRIPTION && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab(TOP_TAB_BARS.DESCRIPTION)}>
          <Text style={styles.tabText}>{localStrings.description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === TOP_TAB_BARS.ADDITIONAL_DETAILS &&
              styles.selectedTab,
          ]}
          onPress={() => setSelectedTab(TOP_TAB_BARS.ADDITIONAL_DETAILS)}>
          <Text style={styles.tabText}>{localStrings.additionalDetails}</Text>
        </TouchableOpacity>
      </View>
    ),
    [selectedTab],
  );

  const renderDescription = useCallback(
    () => (
      <Text
        style={[
          styles.contentText,
          !bookDetails.description && {textAlign: 'center'},
        ]}>
        {bookDetails.description || localStrings.noDescription}
      </Text>
    ),
    [bookDetails.description],
  );

  const renderAdditionalDetails = useCallback(
    () => (
      <View style={styles.additionalDetailsContainer}>
        {prepareAddtionalsDetailsData.map((item, index) => (
          <View key={index} style={styles.additionalDetailsItem}>
            <Text style={styles.additionalDetailsItemLabel}>{item.label}</Text>
            <Text style={styles.additionalDetailsItemValue}>
              {item.value || '-'}
            </Text>
          </View>
        ))}
      </View>
    ),
    [bookDetails, prepareAddtionalsDetailsData],
  );

  const renderSnackbar = useCallback(
    () => (
      <View>
        <Snackbar
          duration={1500}
          style={styles.snackbarMessage}
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}>
          <Text style={styles.snackbarMessageText}>{snackbarMessage}</Text>
        </Snackbar>
      </View>
    ),
    [isSnackbarVisible, snackbarMessage],
  );

  const renderContent = useCallback(
    () =>
      selectedTab === TOP_TAB_BARS.DESCRIPTION
        ? renderDescription()
        : renderAdditionalDetails(),
    [selectedTab, renderDescription, renderAdditionalDetails],
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          animating={true}
          color={colors.brown.medium}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderBookInfo()}
        {renderTopBar()}
        {renderContent()}
      </ScrollView>
      {renderSnackbar()}
    </View>
  );
};

export default BookDetailsScreen;
