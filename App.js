import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Calendar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#083e88',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%'
  },
});
