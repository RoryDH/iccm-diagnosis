import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import {styled} from '@emotion/native'
import TimerCircle from './TimerCircle'

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1,
      current: start
    };
    this.time = 0;
    this.count = 0;
  }

  startTapping = () => {
    this.setTick();
    this.setState({
      current: tapping
    })
  }

  onCompletion = () => {
    clearInterval(this.interval);
    this.setState({ current: finished, bpm: this.count });
  }

  setTick() {
    this.interval = setInterval(() => {
        this.time += 1
        console.log(this.time);
    }, 1000);
  }

  onPress = () => {
    this.count += 1;
  }

  render() {
    switch (this.state.current) {
      case start:
        return (
          <View style={styles.container}>
            <TouchableHighlight
              style={styles.startbutton}
              onPress={this.startTapping}
            >
              <Text> First Press Start </Text>
            </TouchableHighlight>
          </View>
        )

      case tapping:
        return (
          <>
            <TimerCircle
              seconds={59}
              radius={100}
              borderWidth={10}
              color='#f00'
              shadowColor='#999'
              onTimeElapsed={this.onCompletion}
            />

            <TouchableHighlight
              style={styles.tapbutton}
              onPress={this.onPress}
            >
              <Text>Tap at every inhalation</Text>
            </TouchableHighlight>

          </>
        )
      case finished:
        return (
          <View style={styles.container}>

            <View style={[styles.countContainer]}>
              <Text style={[styles.countText]}>
                Inhalations per minute: {this.state.bpm}
              </Text>
            </View>
            <View style={[styles.countContainer]}>
              <Text style={[styles.countText]}>
                Time taken: 60s
              </Text>
            </View>

          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  startbutton: {
    alignItems: 'center',
    backgroundColor: '#0ace0a',
    padding: 20
  },
  tapbutton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 80
  },
  stopbutton: {
    alignItems: 'center',
    backgroundColor: '#ce0a0a',
    padding: 20
  },
  calbutton: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})
