import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FAB} from 'react-native-paper';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import {MathApp} from './components/MathApp';
// import {styles} from './components/Styles';
// import {AsyncComponent} from './AsyncComponent';
// import {MySurface} from './components/MySurface';
// import { ArithOpsScreen } from "./maths/components/ArithOpsScreen";
// import {MyStack} from './components/MyStack';
import {MyWelcomeScreen} from './components/MyWelcomeScreen';

const Stack = createStackNavigator();

const LevelScreen = ({navigation}) => {
  let level = 1;

  return (
    <>
      {Array.apply(0, Array(4).fill(0))
        .map(function (_, b) {
          return b;
        })
        .map(k => (
          <FAB
            key={k}
            style={{margin: 10, width: 200, alignSelf: 'center'}}
            medium
            icon=""
            label={'Level ' + (k + 1)}
            onPress={() => navigation.navigate('MathScreen', {level: k + 1})}
          />
        ))}
    </>
  );
};

const MathScreen = ({navigation, route}) => {
  return <MathApp level={route.params.level} />;
};

const MathsMainApp = () => {
  return <MyWelcomeScreen />;
};

export default MathsMainApp;
