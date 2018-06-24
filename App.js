import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  NativeModules,
  Dimensions,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const win = Dimensions.get('window');

LocaleConfig.locales['bg'] = {
  monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
  monthNamesShort: ['Ян.', 'Фев.', 'Март', 'Апр.', 'Май', 'Юни', 'Юли', 'Авг.', 'Сеп.', 'Окт.', 'Ноем.', 'Дек.'],
  dayNames: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
  dayNamesShort: ['Нед.', 'Пон.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.']
};
LocaleConfig.defaultLocale = 'bg';

export default class PostbankCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)} />
          <ActionButton buttonColor="#D21A1C" offsetY={70}>
          <ActionButton.Item buttonColor="#D21A1C" title="Напомняне" onPress={() => console.log(this.state.items)}>
            <Icon name="md-create" style={styles.actionButton} />
          </ActionButton.Item>
        </ActionButton>
        <View style={{ width: '100%', height: 60, backgroundColor: '#F5F5F5' }}>
          <Image
            source={require('./assets/postbank.png')}
            style={styles.footer}
            resizeMode={'contain'} />
        </View>
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Нямате ангажименти за тази дата!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    alignSelf: 'flex-start',
    width: win.width,
    height: 10,
    bottom: 0,
    backgroundColor: '#F5F5F5'
  },
  actionButton: {
    fontSize: 20,
    height: 22,
    color: 'white',
    zIndex: 999
  },
  item: {
    backgroundColor: '#EBEBEB',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

