import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import CheckBox from 'react-native-check-box';

const UserChecklist = ({userdata, setUserdata}) => {
  const handleChange = id => {
    let temp = userdata.map(user => {
      if (id === user.id) {
        return {...user, isChecked: !user.isChecked};
      }
      return user;
    });
    setUserdata(temp);
  };
  const renderFlatList = renderData => {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={renderData}
          renderItem={({item}) => (
            <View style={styles.card}>
              <CheckBox
                isChecked={item.isChecked}
                onClick={() => {
                  handleChange(item.id);
                }}
              />
              <Text style={{paddingLeft: 10}}>{item.name}</Text>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>{renderFlatList(userdata)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 1,
    padding: 1,
    height: 30,
    // width: 80,
    justifyContent: 'flex-start',
    backgroundColor: '#d6a0e8',
    borderRadius: 20,
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default UserChecklist;
