import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../theme/colors';

const DisplayOptionIcon = ({
  name,
  size,
  color,
  handleOnPressIcon,
  isActive,
}) => {
  return (
    <TouchableOpacity
      style={[styles.iconContainer, isActive && styles.activeIconContainer]}
      onPress={handleOnPressIcon}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={isActive ? colors.brown.light : color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 2,
    borderRadius: 3,
  },
  activeIconContainer: {
    backgroundColor: colors.brown.dark,
  },
});

export default DisplayOptionIcon;
