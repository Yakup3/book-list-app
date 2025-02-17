import LocalizedStrings from 'react-native-localization';

export const localStrings = new LocalizedStrings({
  en: {
    rating: 'Rating',
    review: 'Review',
    description: 'Description',
    bookDetails: 'Book Details',
    publishYear: 'Publish Year',
    searchResult: 'Search Result',
    searchForBooks: 'Search for books...',
    additionalDetails: 'Additional Details',
    noDescription: 'No description available.',
    findYourBookOfChoice: 'Find your book of choice',
    wantToRead: 'Want to read',
    currentlyReading: 'Currently reading',
    haveRead: 'Have read',
    publisher: 'Publisher',
    language: 'Language',
    subjects: 'Subjects',
    people: 'People',
    places: 'Places',
    times: 'Times',
    favoritesList: 'Favorites List',
    emptyMessage: `Oh, you've got nothing`,
    addedToFavorites: 'Added to favorites',
    removeFromFavorites: 'Removed from favorites',
  },
  it: {
    rating: 'Valutazione',
    review: 'Recensione',
    description: 'Descrizione',
    bookDetails: 'Dettagli del libro',
    searchResult: 'Risultato di ricerca',
    publishYear: 'Anno di pubblicazione',
    searchForBooks: 'Cerca libri...',
    additionalDetails: 'Dettagli aggiuntivi',
    noDescription: 'Descrizione non disponibile.',
    findYourBookOfChoice: 'Trova il tuo libro di scelta',
    wantToRead: 'Voglio leggere',
    currentlyReading: 'Sto leggendo',
    haveRead: 'Ho letto',
    publisher: 'Editore',
    language: 'Lingua',
    subjects: 'Argomenti',
    people: 'Persone',
    places: 'Luoghi',
    times: 'Epoche',
    favoritesList: 'Lista dei preferiti',
    emptyMessage: 'Oh, non hai niente',
    addedToFavorites: 'Aggiunto ai preferiti',
    removeFromFavorites: 'Rimosso dai preferiti',
  },
});

localStrings.setLanguage('en');
