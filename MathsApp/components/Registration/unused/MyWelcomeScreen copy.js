import React, {useState, useEffect} from 'react';
import {styles} from './Registration/Styles';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import UserHomeScreen from './Registration/UserHomeScreen';
// import GamesScreen from './GameScreen';

import DatePicker from 'react-native-date-picker';
import {FAB} from 'react-native-paper';
// import { StyleSheet } from 'react-native';
import {
  Card,
  Surface,
  Avatar,
  List,
  Colors,
  Title,
  Paragraph,
} from 'react-native-paper';

// import {UserScreen} from './Registration/unused/UserScreen';
// import {MathApp} from './MathApp';
// import {MySurface} from './MySurface';

const Stack = createStackNavigator();

const MathScreen = ({navigation, route}) => {
  const {user_id, operation, level} = route.params;
  // console.log("in MathScreen", user_id, operation, level);
  return <MathApp level={level} user_id={user_id} operation={operation} />;
};

const LevelScreen = ({navigation, route}) => {
  // operation=route.params.operation
  const {user_id, operation} = route.params;

  // let level=1
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
            onPress={() =>
              navigation.navigate('MathScreen', {
                user_id: user_id,
                operation: operation,
                level: k + 1,
              })
            }
          />
        ))}
    </>
  );
};

// const RegisteredUserScreen = ({ navigation, route }) => {
//   const { uids, unames } = route.params;
//   k = 0;
//   return (
//     <>
//       {Array(uids.length)
//         .fill()
//         .map((element, index) => index + 0)
//         .map((k) => (
//           <FAB
//             key={k}
//             style={{ margin: 10, width: 200, alignSelf: "center" }}
//             medium
//             icon=""
//             label={unames[k] + " Games"}
//             onPress={() =>
//               navigation.navigate("GamesScreen", {
//                 user_id: uids[k],
//                 user_name: unames[k],
//               })
//             }
//           />
//         ))}
//     </>
//   );
// };
const MyWelcomeScreen = () => {
  const [iserror, setiserror] = useState(null);
  const [users, setUsers] = useState({});
  // let urs = { parent: { name: "", dob: "", dor: "" }, children: [] };
  // const removeItemValue = async (key) => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     return true;
  //   } catch (exception) {
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await AsyncStorage.getItem("users")
  //       .then((res) => JSON.parse(res))
  //       .then((res) => (res ? setUsers(res) : setUsers(urs)))
  //       .catch((e) => setiserror(true));
  //   };
  //   const timer = setTimeout(() => {
  //     fetchData();
  //   }, 50);
  //   return () => clearTimeout(timer);
  // }, []);

  // console.log(iserror, users);
  // if (!iserror) {
  //   if (users.children && users.children.length > 0) {
  //     // console.log(users.children)

  //     var userids = users.children.map((k) => k.id);
  //     var usernames = users.children.map((k) => k.name);

  // console.log(userids,usernames)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
              name="User Screen"
              component={RegisteredUserScreen}
              options={{ title: "User Accounts" }}
              initialParams={{ uids: userids, unames: usernames }}
            /> */}

        <Stack.Screen
          name="Home"
          component={UserHomeScreen}
          options={{title: 'Welcome'}}
        />

        {/* <Stack.Screen
          name="GamesScreen"
          component={GamesScreen}
          options={{title: 'Select an Operation'}}
          initialParams={{user_id: 0, user_name: 'none'}}
        />

        <Stack.Screen
          name="LevelScreen"
          component={LevelScreen}
          options={{title: 'Select Level'}}
        />
        <Stack.Screen
          name="MathScreen"
          component={MathScreen}
          options={{title: 'Maths Operation'}}
          initialParams={{
            user_id: 0,
            operation: 'Addition',
            level: 0,
          }}
        /> */}

        {/*      */}

        {/* </ImageBackground> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  //     } else {
  //       return <UserScreen />;
  //     }
  //   } else {
  //     return <UserScreen />;
  //   }
};

export default MyWelcomeScreen;
