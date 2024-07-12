# React Native Book List App

This mobile application allows users to search for books using the Open Library API and manage their favorites list.

## Features

- **Book List:** View a list of books with titles, author names and covers fetched from the Open Library API.
- **Book Details:** Select a book to view detailed information.
- **Favorites:** Add or remove books from your favorites list.
- **Favorites Screen:** View all books added to favorites.

## Technologies Used

- **React Native:** Framework for building mobile applications using JavaScript and React.
- **Redux:** State management library for managing application state.
- **React Navigation:** Routing and navigation for React Native apps.
- **Axios:** Promise-based HTTP client for making API requests.

## Demo
https://drive.google.com/file/d/1V-iQPTRAz-VeHuTuG2HVIHQ2a76pXWNi

## Installation

1. **Clone the repository:**
```bash
git@github.com:Yakup3/book-list-app.git
```
```bash
cd book-list-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install iOS dependencies:**
```bash
cd ios && pod install && cd ..
```

4. **Run on Android:**
```bash
npm run android
```

5. **Run on iOS:**
```bash
npm run ios
```

## Usage

- Use the search bar on the Home Screen to search for books.
- Customize the display of book items on the Home Screen.
- Tap on a book to view its details.
- On the details screen, use the favorite button to add or remove the book from your favorites.
- Navigate to the Favorites Screen to view all your favorite books.
