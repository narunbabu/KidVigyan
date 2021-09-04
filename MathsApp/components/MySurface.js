import React, {useState} from 'react';
// import { Surface, Text } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {
  Card,
  Surface,
  Avatar,
  Text,
  List,
  Colors,
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';
// import { styles } from './Styles';
import {NavigationContainer} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

// const LevelScreen = ({navigation, route}) => {
//   // let level=1
//   return (
//     <>
//       {/* <Button
//     title="Go to Ved's profile"
//     onPress={() =>
//       navigation.navigate('Profile', { name: 'Jane' })
//     } /> */}

//       {Array.apply(0, Array(4).fill(0))
//         .map(function (_, b) {
//           return b;
//         })
//         .map(k => (
//           <FAB
//             key={k}
//             style={{margin: 10, width: 200, alignSelf: 'center'}}
//             medium
//             icon=""
//             label={'Level ' + (k + 1)}
//             onPress={() => navigation.navigate('MathScreen', {level: k + 1})}
//           />
//         ))}
//     </>
//   );
// };

export const MySurface = ({name, symbol, myfunc}) => {
  [value, setValue] = useState('Look here');
  return (
    <>
      <Card onPress={() => myfunc()} style={styles.surface}>
        <Card.Content style={{alignItems: 'center'}}>
          <Avatar.Text size={60} label={symbol} color={Colors.red200} />
          <Paragraph>{name}</Paragraph>
        </Card.Content>
      </Card>
    </>
  );
};

export default MySurface;

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 120,
    margin: 10,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // backgroundColor:'#d4ed82',
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
