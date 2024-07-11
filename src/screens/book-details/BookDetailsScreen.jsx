import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
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

const TOP_TAB_BARS = {
  DESCRIPTION: 'description',
  ADDITIONAL_DETAILS: 'additionalDetails',
};

const BookDetailsScreen = () => {
  const route = useRoute();
  const {book} = route.params;
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBoookDetails] = useState(book);
  const [selectedTab, setSelectedTab] = useState(TOP_TAB_BARS.DESCRIPTION);

  const navigation = useNavigation();

  useEffect(() => {
    _fetchBookDetails();
  }, []);

  const _fetchBookDetails = () => {
    setLoading(true);
    fetchBookDetails(bookDetails.key)
      .then(res => {
        setBoookDetails({
          ...bookDetails,
          description:
            typeof res.description == 'object'
              ? res.description?.value
              : res.description,
          subjects: res.subjects,
          subject_times: res.subject_times,
          subject_places: res.subject_places,
          subject_people: res.subject_people,
        });
      })
      .catch(err => {
        console.log('error in fetch book details');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const prepareDetailsData = () => {
    const detailsData = [
      {label: localStrings.publishYear, value: bookDetails.first_publish_year},
      {label: localStrings.review, value: bookDetails.ratings_count},
      {
        label: localStrings.rating,
        value: bookDetails.ratings_average?.toFixed(1),
      },
    ];
    return detailsData;
  };

  const prepareAddtionalsDetailsData = () => {
    const additionalDetails = [
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
    ];
    return additionalDetails;
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHeartPress = () => {};

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.iconContainer}>
        <Icon name="arrowleft" size={22} color={colors.brown.dark} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{localStrings.bookDetails}</Text>
      <TouchableOpacity onPress={handleHeartPress} style={styles.iconContainer}>
        <Icon name="hearto" size={22} color={colors.brown.dark} />
      </TouchableOpacity>
    </View>
  );

  const renderBookInfo = () => {
    return (
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
          {prepareDetailsData().map((item, index) => (
            <View style={styles.detailsBoxItem} key={index}>
              <Text style={styles.detailsTextLabel}>{item.label}</Text>
              <Text style={styles.detailsText}>{item.value || '-'}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTopBar = () => (
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
          selectedTab === TOP_TAB_BARS.ADDITIONAL_DETAILS && styles.selectedTab,
        ]}
        onPress={() => setSelectedTab(TOP_TAB_BARS.ADDITIONAL_DETAILS)}>
        <Text style={styles.tabText}>{localStrings.additionalDetails}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDescription = () => {
    const {description} = bookDetails;

    return (
      <Text style={[styles.contentText, !description && {textAlign: 'center'}]}>
        {description || localStrings.noDescription}
      </Text>
    );
  };

  const renderAdditionalDetails = () => {
    return (
      <View style={styles.additionalDetailsContainer}>
        {prepareAddtionalsDetailsData().map((item, index) => (
          <View key={index} style={styles.additionalDetailsItem}>
            <Text style={styles.additionalDetailsItemLabel}>{item.label}</Text>
            <Text style={styles.additionalDetailsItemValue}>
              {item.value || '-'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () =>
    selectedTab === TOP_TAB_BARS.DESCRIPTION
      ? renderDescription()
      : renderAdditionalDetails();

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
    </View>
  );
};

export default BookDetailsScreen;
