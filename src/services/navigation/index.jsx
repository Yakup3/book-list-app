import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
// ? Screens
import HomeScreen from '../../screens/home/HomeScreen';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import BookDetailesScreen from '../../screens/book-details/BookDetailsScreen';

import colors from '../../theme/colors';
import {PAGES, ScreenHeight, ScreenWidth} from '../../shared/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const TabNavigator = () => {
    const renderTabBarIcon = (color, size, focused, route) => {
      let iconName;

      if (route.name === PAGES.HOME) {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === PAGES.FAVORITES) {
        iconName = focused ? 'heart' : 'heart-outline';
      }

      return (
        <View style={styles.tabBarButton}>
          <Icon name={iconName} color={color} size={size} />
          <Text style={styles.tabBarLabel(color, focused)}>{route.name}</Text>
        </View>
      );
    };

    return (
      <Tab.Navigator
        backBehavior="none"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size, focused}) =>
            renderTabBarIcon(color, size, focused, route),
          tabBarStyle: {
            ...styles.tabBarNavigator,
            ...styles.tabBarShadow,
          },
          tabBarActiveTintColor: colors.text.white,
          tabBarInactiveTintColor: colors.brown.light,
          tabBarShowLabel: false,
          headerShown: false,
        })}>
        <Tab.Screen name={PAGES.HOME} component={HomeScreen} />
        <Tab.Screen name={PAGES.FAVORITES} component={FavoritesScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={PAGES.HOMEPAGE}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={PAGES.HOMEPAGE} component={TabNavigator} />
        <Stack.Screen name={PAGES.BOOKDETAILS} component={BookDetailesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarNavigator: {
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.08,
    alignSelf: 'center',
    borderRadius: ScreenWidth * 0.05,
    backgroundColor: colors.brown.dark,
  },
  tabBarButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  tabBarLabel: (color, focused) => ({
    color: color,
    fontWeight: focused && 600,
    textTransform: 'capitalize',
  }),
});

export default Navigation;
