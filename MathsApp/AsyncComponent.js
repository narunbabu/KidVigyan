import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import React, { useState, useEffect } from "react";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

export const AsyncComponent = () => {
  const [name, setName] = useState("Arun"); //new Array(3).fill(1)
  const [topname, setTopname] = useState("setinfirststep"); //new Array(3).fill(1)
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const storeData = async () => {
    let obj = {
      name: "Vedansh",
      email: "ved@gmail.com",
      city: "Hyderabad",
    };
    obj["name"] = topname;
    // console.log(obj)

    try {
      await AsyncStorage.setItem("user", JSON.stringify(obj));
      console.log("Data set");
    } catch (e) {
      console.log("Data not set");
      // saving error
    }
  };

  const retrieveData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      // console.log(parsed.name);
      setName(parsed.name);
      // return <Text style={{fontSize:40}}>{name}</Text>
    } catch (e) {
      console.log("Not retrieved");
      // return <Text style={{fontSize:40}}>Null</Text>}
    }
  };

  return (
    //   <SafeAreaView style={backgroundStyle}>
    <View>
      <Text>{topname}</Text>
      <TextInput
        backgroundColor="red"
        onChangeText={(name) => setTopname(name)}
      />
      <Button onPress={() => storeData()} title="Press me" />
      <Button onPress={() => retrieveData()} title="Retrieve" />
      <Text style={{ fontSize: 40 }}>{name}</Text>
    </View>
    //    {/* <ProfileScreen /> */}
    //   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

//   export default AsyncApp;
