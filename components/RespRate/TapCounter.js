import React, { Component } from 'react'
import {
  Container,
  ScrollContainer,
  ButtonsBox,
  Header,
  QuestionBox,
  Question,
  AnswerButton,
  InfoButton,
  InfoImage,
  AnswerText,
  AnswerTextView,
  AnswerRow,
  LineBreak
} from '../../utils/styles';
import TimerCircle from './TimerCircle'

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

initialState = {
  time: 0,
  current: start,
  count: 0,
}

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  startTapping = () => {
    this.setTick();
    this.setState({
      current: tapping,
    })
  }

  onCompletion = () => {
    clearInterval(this.interval);
    console.log(this.state.time)
    this.setState({ current: finished, bpm: this.state.count });
  }

  reset = () => {
    clearInterval(this.interval);
    this.setState(initialState);
  }

  setTick() {
    this.interval = setInterval(() => {
      time = this.state.time +1
      this.setState({time:time});
      //console.log(this.state.time)
    }, 1000);
  }

  onPress = () => {
    this.state.count += 1;
  }

  render() {
    switch (this.state.current) {
      case start:
      case tapping:
        return (
          <Container>
            <Header>BPM Counter</Header>
            <ScrollContainer >
              <TimerCircle
                start={this.state.current === tapping}
                onTimeElapsed={this.onCompletion}
                seconds={3}
                radius={80}
                borderWidth={20}
                color='#f00'
                bgColor="#fff"
                shadowColor='#999'
                textStyle={{ fontSize: 20 }}
                style={{ margin: 10, alignSelf:'center' }}
              />
              <QuestionBox><Question>
                Press Start then tap the button at every inhalation
            </Question></QuestionBox>
              <ButtonsBox>
                <AnswerButton
                  onPress={this.state.current === start ? this.startTapping : this.onPress}
                >
                  <AnswerTextView
                  ><AnswerText>{this.state.current === start ? 'Start' : 'Tap at every inhalation'}</AnswerText></AnswerTextView>
                </AnswerButton>
                <AnswerButton
                  onPress={() => this.setState(initialState)}
                >
                  <AnswerTextView
                  ><AnswerText>Reset</AnswerText></AnswerTextView>
                </AnswerButton>
              </ButtonsBox>

            </ScrollContainer>
          </Container>
        )
      case finished:
        return (
          <Container>
            <Header>BPM Counter</Header>
            <ScrollContainer >
              <QuestionBox><Question>
                Inhalations per minute: {this.state.bpm}
              </Question></QuestionBox>
              <ButtonsBox>
                <AnswerButton
                  onPress={() => this.props.respRate(this.state.bpm)}
                >
                  <AnswerTextView><AnswerText> Continue </AnswerText></AnswerTextView>
                </AnswerButton>
                <AnswerButton
                  onPress={() => this.setState(initialState)}
                >
                  <AnswerTextView><AnswerText>Redo</AnswerText></AnswerTextView>
                </AnswerButton>
              </ButtonsBox>
            </ScrollContainer>
          </Container>
        )
    }
  }
}
