import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class App extends React.Component {
  render() {
    return (
        <Agenda/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
