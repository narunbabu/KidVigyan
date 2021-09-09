import React, {useState, useEffect} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {levels} from '../../Data/Data';
import {grey100} from 'react-native-paper/lib/typescript/styles/colors';

// const data = [
//     {id: 1, txt: 'first check', isChecked: false},
//     {id: 2, txt: 'second check', isChecked: false},
//     {id: 3, txt: 'third check', isChecked: false},
//     {id: 4, txt: 'fourth check', isChecked: false},
//     {id: 5, txt: 'fifth check', isChecked: false},
//     {id: 6, txt: 'sixth check', isChecked: false},
//     {id: 7, txt: 'seventh check', isChecked: false},
//   ];

const GameItem = ({item, myFunc}) => {
  const [level, setLevel] = useState(1);
  const [num_problems, setNum_problems] = useState(5);

  item['num_problems'] = num_problems;
  item['level'] = level;
  return (
    <Card style={{margin: 5}}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          {/* <Avatar.Text size={60} label={item.operator} color={Colors.red200} /> */}

          <Card
            style={styles.surface}
            onPress={() => {
              navigation.navigate('MathScreen', {
                user: '',
                stackdata: {},
                operation: item, //level,name,id,operator
              });
            }}>
            <Card.Content style={{alignItems: 'center'}}>
              <Avatar.Text
                size={25}
                label={item.operator}
                color={Colors.red200}
              />
              <Paragraph style={{fontSize: 8}}>{item.name}</Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.secondorderitem}>
            <Text style={{fontSize: 8}}>Select</Text>
            <ModalDropdown
              style={styles.dropdown}
              defaultValue={'Level ' + item.level}
              options={levels.map(l => 'Level ' + l.level)}
              onSelect={(idx, value) => {
                setLevel(parseInt(value.substring(5, 7)));
              }}
            />
          </View>

          {/* <Text>{item.operation}</Text> */}
          {/* <TouchableHighlight
            style={styles.addtostack}
            onPress={() => {
              navigation.navigate('MathScreen', {
                user: '',
                stackdata: {},
                operation: operation, //level,name,id,operator
              });
            }}
            >
            
          </TouchableHighlight> */}
          <View style={styles.secondorderitem}>
            <Text style={{fontSize: 8}}>Problems</Text>
            <TextInput
              pattern="[+-]?\d+(?:[.,]\d+)?"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={digit => setNum_problems(digit)}
              value={num_problems.toString()}
              // autoFocus={focusTruths[k]}
              // placeholder=''
              // {guessdigits[k].toString() || '' }
              //   editable={!isRightGuesses[k]}
            />
          </View>
          <TouchableHighlight
            style={styles.addtostack}
            // onPress={() => console.log('clicked')}
            onPress={() => myFunc(item)}>
            <Text>Add</Text>
          </TouchableHighlight>

          {/* <CheckBox isChecked={item.isChecked} onClick={() => myFunc(item)} /> */}
        </View>
      </View>
    </Card>
  );
};

export default GameItem;
const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 60,
    margin: 1,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // backgroundColor:'#d4ed82',
    borderRadius: 20,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',

    borderRadius: 5,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addtostack: {
    // position: 'absolute',
    width: 70,
    height: 40,
    // left: 0,
    // bottom: 0,
    shadowColor: 'grey',
    shadowRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    margin: 16,
    padding: 10,
    backgroundColor: '#b1f0e8',
    borderRadius: 20,
    alignItems: 'center',
  },
  dropdown: {
    width: 50,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e3ebdf',
    padding: 5,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
  },
  input: {
    width: 30,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e4eba9',
    padding: 2,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    // alignSelf: 'center',
    fontSize: 15,
    // alignItems: 'center',
  },
  secondorderitem: {
    alignItems: 'center',
    marginTop: 10,
  },
});
