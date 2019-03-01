import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Fever } from '../components/Sections/Fever';
import { Cough } from '../components/Sections/Cough';
import { Diarrhoea } from '../components/Sections/Diarrhoea';
import { DangerSigns } from '../components/Sections/DangerSigns';
import { Sections } from '../utils/constants';

import styled, { css } from '@emotion/native'
import { Section } from '../components/Section';

import { ResultsScreen } from './ResultsScreen';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
`
const End = <View>End of Survey</View>

const sections = {
  [Sections.fever]: Fever,
  [Sections.cough]: Cough,
  [Sections.diarrhoea]: Diarrhoea,
  [Sections.dangersigns]: DangerSigns,
}

const initialState = () => {
  return {
    sections: {
      current: Sections.fever,
      next: [Sections.dangersigns, Sections.cough, Sections.diarrhoea],
      waiting: [],
      completed: []
    },
    sectionResults: {}
  }
}


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState()
  }

  currentSection = () => this.state.sections.current;

  moveToNextSection = (endingQuestionId) => {
    var sections = this.state.sections;
    console.log(`Ending question in ${sections.current} Id ${endingQuestionId}`)

    this.saveResult(endingQuestionId)

    sections.completed.push(sections.current);
    sections.current = sections.next.shift();

    this.setState(
      sections
    );
  };

  saveResult = (id) => {
    // let newResults = this.state.sectionResults
    // newResults[this.state.sections.current] = questions[id].text

    this.setState({
      sectionResults: { ...this.state.sectionResults, [this.state.sections.current]: id }
    })
  }

  resetState = () => {
    this.setState(initialState())
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    let currentSection = this.state.sections.current;

    if (currentSection) {
      let CurrentSectionComponent = sections[this.state.sections.current]
      return (
        <Container><CurrentSectionComponent onCompletion={this.moveToNextSection} /></Container>
      );
    } else {
      return (
        <ScrollView>
          <Container><ResultsScreen reset={this.resetState} sectionResults={this.state.sectionResults} sectionComponents={sections} /></Container>
        </ScrollView>
      );
    }
  }

}
