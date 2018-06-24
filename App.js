import React from 'react';
import { StyleSheet, Text, View, Navigator, NativeModules, Button } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['bg'] = {
  monthNames: ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември'],
  monthNamesShort: ['Ян.','Фев.','Март','Апр.','Май','Юни','Юли','Авг.','Сеп.','Окт.','Ноем.','Дек.'],
  dayNames: ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота'],
  dayNamesShort: ['Нед.','Пон.','Вт.','Ср.','Чт.','Пт.','Сб.']
};
LocaleConfig.defaultLocale = 'bg';

export default class App extends React.Component {
  render() {
    return (
     <Agenda/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
