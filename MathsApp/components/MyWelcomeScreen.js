import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from './Registration/UserHomeScreen';
import GamesScreen from './GameScreen';
// import LevelScreen from './LevelScreen';
import {MathApp} from './MathApp';

const Stack = createStackNavigator();

const MathScreen = ({navigation, route}) => {
  const {user, operation, level} = route.params;
  console.log('in MathScreen', user, operation, level);
  return <MathApp level={level} user={user} operation={operation} />;
};

const MyWelcomeScreen = () => {
  const [iserror, setiserror] = useState(null);
  const [users, setUsers] = useState({});

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
          initialParams={{user: {}}}
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
            operation: 'Addition',
            level: 0,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyWelcomeScreen;
