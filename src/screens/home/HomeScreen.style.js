import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {ScreenWidth} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ScreenWidth * 0.075,
    backgroundColor: colors.brown.lighter,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: colors.brown.dark,
    borderColor: colors.brown.medium,
  },
  iconContainer: {
    marginLeft: 8,
  },
  activityIndicator: {
    flex: 1,
  },
  bookList: {
    paddingBottom: 16,
  },
  searchResultCount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.brown.medium,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.brown.dark,
  },
});
