import LocalizedStrings from 'react-native-localization';

export const localStrings = new LocalizedStrings({
  en: {
    searchResult: 'Search Result',
    searchForBooks: 'Search for books...',
    findYourBookOfChoice: 'Find your book of choice',
  },
  it: {
    searchResult: 'Risultato di ricerca',
    searchForBooks: 'Cerca libri...',
    findYourBookOfChoice: 'Trova il tuo libro di scelta',
  },
});

localStrings.setLanguage('en');
