// import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button} from 'react-native';
// import WaterPlanet from './WaterPlanet/WaterPlanet';
// import MathsMainApp from './MathsApp/App';
// import UserHomeScreen2 from './MathsApp/components/Registration/UserHomeScreen2';
// import UserHomeScreen from './MathsApp/components/Registration/UserHomeScreen';
// import Sqlfunctions from "./MathsApp/components/Sqlfunctions";
// import SqlClass from "./MathsApp/components/SqlClass";
// var mysql = SqlClass();
// import UserNav from './MathsApp/components/Registration/UserNav';
// import RApp from './RewardApp/RApp';
import MyWelcomeScreen from './MathsApp/components/MyWelcomeScreen';
// import {DialogComponent, DialogTitle} from 'react-native-dialog-component';
const App = () => {
  // mysql.createUserTable();
  return (
    // <Text>Hello </Text>
    // <UserNav />
    <MyWelcomeScreen />
    // <RApp />
    // <WaterPlanet />
    // <MathsMainApp />
    // <UserHomeScreen2 />
  );
};

export default App;
