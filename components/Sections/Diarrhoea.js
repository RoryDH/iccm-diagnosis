import React from 'react';
import { Section } from '../Section';


// <Section questions={questions} />
export class Diarrhoea extends React.Component {
  static questions = {
    1: {
      text: "Child > 2 months and < 5 years with diarrhea (>= loose stools/24h) <= 3 weeks without blood or rice water aspect.",
      answers: [
        { text: "yes", goto: "10" },
        { text: "no", goto: "2" },
      ]
    },
    2: {
      text: "Less than loose stools/24h?",
      answers: [
        { text: "yes", goto: "3" },
        { text: "no", goto: "4" },
      ]
    },
    3: {
      text: "No need for treatment. Continue normal feeding according to age.",
      sectionEnd: true
    },
    4: { // Wrong age?
      text: "Child < 2 months or > 5 years?",
      answers: [
        { text: "yes", goto: "5" },
        { text: "no", goto: "6" },
      ]
    },
    5: {
      text: "Refer to Health Centre.",
      sectionEnd: true
    },
    6: {
      text: "Longer than 3 week history?",
      answers: [
        { text: "yes", goto: "5" },
        { text: "no", goto: "7" },
      ]
    },
    7: {
      text: "Bloody diarrhea or rice water stools?",
      answers: [
        { text: "yes", goto: "5" },
        { text: "no", goto: "8" },
      ]
    },
    8: {
      text: "Signs of severe dehydration?",
      answers: [
        { text: "yes", goto: "5" },
        { text: "no", goto: "9" },
      ]
    },
    9: {
      text: "Needs human diagnosis.",
      sectionEnd: true
    },
    10: {
      text: "Signs of severe dehydration?\n\
      - Sunken eyes\n\
      - Skin pinch > 3 seconds\n\
      - Other danger signs",
      answers: [
        { text: "yes", goto: "4" },
        { text: "no", goto: "11" },
      ]
    },
    11: {
      text: "Uncomplicated diarrhoea: give ORS and Zinc sulfate according to age, \n\
  plus Albendazole (if not received within last 6 months).",
      sectionEnd: true
    },
  }

  render() {
    return <Section title="Diarrhoea" questions={Diarrhoea.questions} onCompletion={this.props.onCompletion}/>
  }
}
