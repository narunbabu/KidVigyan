import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const MyButton = props => {
  if (props.tohide) {
    return null;
  } else {
    return (
      <View
        style={{
          marginTop: 0,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={
            props.color
              ? [styles.button, {backgroundColor: props.color}]
              : styles.button
          }
          onPress={props.customClick}
          useNativeDriver={true}>
          <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 5,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30,

    width: 100,
    height: 40,
  },
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#f05555',
  //   color: '#ffffff',
  //   padding: 15,
  //   marginTop: 16,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   borderRadius: 30,

  //   width: 120,
  //   height: 60,
  // },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default MyButton;
