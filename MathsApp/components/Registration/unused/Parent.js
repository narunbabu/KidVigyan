import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { styles } from "./Styles";
export const Parent = ({ pname, pdob, pdor, setpDob, setpDor, setpName }) => {
  // const [dob, setDob] = useState("");
  // const [dor, setDor] = useState("");
  // const [name, setName] = useState("");

  // setParent({ id: 0, name: name, dob: dob, sclass: "", dor: dor });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Parent Details </Text>
      <View style={styles.intro}>
        <Text style={styles.label}>Name: </Text>
        <TextInput
          style={styles.name}
          placeholder="Parent Name"
          onChangeText={(text) => {
            // mparent.name = text;
            setpName(text);
            // console.log(parent);
          }}
        />
      </View>
      <View style={styles.intro}>
        <Text style={styles.label}>DoB: </Text>
        <DatePicker
          style={styles.date}
          date={new Date("1981-06-07")}
          mode={"date"}
          onDateChange={(date) => {
            // mparent.dob = date;
            // mparent.dor = new Date();
            setpDob(date);
            setpDor(new Date());

            // setParent(mparent);
            // console.log(parent);
          }}
        />
      </View>
    </View>
  );
};

export default Parent;
