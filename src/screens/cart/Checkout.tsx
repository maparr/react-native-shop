import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const Checkout = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Order confirmed</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'black',
  },
});
