import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.brown.lighter,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.brown.dark,
  },
  bookList: {
    paddingBottom: 16,
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
