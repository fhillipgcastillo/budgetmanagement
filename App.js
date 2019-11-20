import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import	Dashboard from "./src/components/dashboard";


export default function App() {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
