import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
// import Prompt from 'react-native-prompt';
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
      items: {},
      showReminderInput: false,
      showDateInput: false,
      text: ''
      // currentReminder: {
      //   date,
      //   name,
      // }
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
            agendaDayTextColor: 'rgb(217,66,53)',
            agendaDayNumColor: 'rgb(19,47,113)',
            agendaTodayColor: 'rgb(217,66,53)',
            agendaKnobColor: 'rgb(19,47,113)',
            selectedDayBackgroundColor: 'rgb(19,47,113)',
            dotColor: 'rgb(217,66,53)',
          }} />
        <View display='none' style={styles.reminderView}>
          <TextInput
            style={{ height: 40, zIndex: 800 }}
            placeholder="Въведете напомняне."
            onChangeText={(text) => this.setState({ text })}
          />
        </View>
        <ActionButton buttonColor="rgb(19,47,113)" offsetY={70}>
          <ActionButton.Item buttonColor="#D94235" title="Напомняне" onPress={() => this.setState({ showReminderInput: true })}>
            <Icon name="md-create" style={styles.actionButton} />
          </ActionButton.Item>
        </ActionButton>
        <View style={{ width: '100%', height: 60, backgroundColor: '#F5F5F5' }}>
          <Image
            source={require('./assets/postbank.png')}
            style={styles.footer}
            resizeMode={'contain'} />
        </View>
        {/* <Prompt
          title="Въведи напомняне"
          placeholder="..."
          visible={this.state.showReminderInput}
          onCancel={() => this.setState({ showReminderInput: false})}
          onSubmit={(value) => {
            this.setState({ showReminderInput: false, showDateInput: true});
              this.state.reminder.name = value;
            } }/>
             <Prompt
          title="Въведи дата в формат ГГГГ-ММ-ДД"
          placeholder="ГГГГ-ММ-ДД"
          visible={this.state.showDateInput}
          onCancel={() => this.setState({ showDateInput: false})}
          onSubmit={(value) => {
            this.setState({ showDateInput: false});
              this.state.reminder.date = value;
              fetch('https://postbank-calendar-11a0a.firebaseio.com/reminders.json', {
                method: 'POST',
                body: JSON.stringify(
                  this.state.reminder
                )
              }).then(res => console.log(res))
            } }/> */}
      </View> 

    );
  }
loadItems() {
    fetch('https://postbank-calendar-11a0a.firebaseio.com/reminders.json') // FOR REMINDERS
      .then(res => res.json())
      .then(parsedRes => {
        for (const id in parsedRes) {
          let date = parsedRes[id].reminder.date;
          let name = parsedRes[id].reminder.name;
          if (!this.state.items[date]) {
            this.state.items[date] = [];
            this.state.items[date].push({
              name: name,
              height: 30
            });
          }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
        this.setState({
          items: newItems
        });
      })
    fetch('https://postbank-calendar-11a0a.firebaseio.com/holidays.json') // FOR HOLIDAYS
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        for (const id in parsedRes) {
          let date = parsedRes[id].holiday.date;
          let name = parsedRes[id].holiday.name;
          if (!this.state.items[date]) {
            this.state.items[date] = [];
            this.state.items[date].push({
              name: name,
              height: 30
            });
          }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
        this.setState({
          items: newItems
        });
      })
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
  reminderView: {
    flex: 1,
    zIndex: 799,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00'
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
    backgroundColor: '#e6e6e6',
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

