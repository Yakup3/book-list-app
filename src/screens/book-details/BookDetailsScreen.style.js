import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {ScreenWidth} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brown.lighter,
    paddingHorizontal: ScreenWidth * 0.075,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  iconContainer: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.brown.dark,
  },
  bookInfoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  bookImage: {
    width: 150,
    height: 220,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.brown.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 18,
    color: colors.brown.medium,
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    borderColor: colors.brown.medium,
  },
  detailsBoxItem: {
    width: '35%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  detailsTextLabel: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: colors.brown.medium,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: colors.brown.dark,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  tab: {
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: colors.brown.medium,
  },
  tabText: {
    fontSize: 16,
    color: colors.brown.dark,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 16,
    paddingBottom: 20,
    color: colors.brown.dark,
  },
  additionalDetailsContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  additionalDetailsItem: {
    flexDirection: 'row',
  },
  additionalDetailsItemLabel: {
    width: '40%',
    fontSize: 16,
    fontWeight: '600',
    color: colors.brown.dark,
  },
  additionalDetailsItemValue: {
    width: '60%',
    fontSize: 16,
    marginRight: 10,
    color: colors.brown.dark,
  },
});
