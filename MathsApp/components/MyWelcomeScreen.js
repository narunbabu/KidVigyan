import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from './Registration/UserHomeScreen';
import GamesScreen from './GameScreen';
import ParentGamesScreen from './ParentGamesScreen';
import {MathScreen} from './MathApp';

const Stack = createStackNavigator();

const MyWelcomeScreen = () => {
  const [iserror, setiserror] = useState(null);
  const [users, setUsers] = useState({});
  // return (
  //   <>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //     <Text>Hello</Text>
  //   </>
  // );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={UserHomeScreen}
          options={{title: 'Welcome'}}
        />

        <Stack.Screen
          name="GamesScreen"
          component={GamesScreen}
          options={{title: 'Select an Operation'}}
          initialParams={{user: {}, stackdata: {}}}
        />
        <Stack.Screen
          name="ParentGamesScreen"
          component={ParentGamesScreen}
          options={{title: 'Set operations'}}
          initialParams={{user: {}, stackdata: {}}}
        />

        {/* <Stack.Screen
          name="LevelScreen"
          component={LevelScreen}
          options={{title: 'Select Level'}}
          initialParams={{user:user, operation: 'Addition'}}
        /> */}
        <Stack.Screen
          name="MathScreen"
          component={MathScreen}
          options={{title: 'Maths Operation'}}
          initialParams={{
            user: {},
            stackdata: {},
            operation: 'Addition',
            level: 0,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyWelcomeScreen;
