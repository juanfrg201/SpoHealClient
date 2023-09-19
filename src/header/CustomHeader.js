import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AnimatedEvent } from 'react-native-reanimated';

const CustomHeader = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
      <Text style={styles.menuIcon}>☰</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 10,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomHeader;