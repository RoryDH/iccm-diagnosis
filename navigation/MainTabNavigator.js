import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import LinksScreen from '../screens/LinksScreen';
import RecordScreen from '../screens/RecordScreen';
import InfoScreen from '../screens/InfoScreen';
import PatientListScreen from '../screens/PatientListScreen';
import PatientViewScreen from '../screens/PatientViewScreen';

const InfoStack = createStackNavigator({
  Info: InfoScreen
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

// const HomeStack = createStackNavigator({
//   Home: DiagnosisScreen
// });
// 
// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

const PatientListScreenStack = createStackNavigator({
  PatientList: PatientListScreen,
  PatientView: PatientViewScreen,
  Diagnosis: DiagnosisScreen,
});

PatientListScreenStack.navigationOptions = {
  tabBarLabel: 'Patients',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-help-circle${focused ? '' : '-outline'}`
          : 'md-help-circle'
      }
    />
  ),
};


const RecordStack = createStackNavigator({
  Record: RecordScreen,
});

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  InfoStack,
  PatientListScreenStack,
  // HomeStack,
  RecordStack
}, {
  initialRouteName: "PatientListScreenStack"
});
