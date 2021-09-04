import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";

import DatePicker from "react-native-date-picker";

import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./Styles";
export const Child = ({
  uid,
  name,
  dob,
  value,
  dor,
  setUid,
  setDob,
  setDor,
  setName,
  setValue,
}) => {
  // const [uid, setUid] = useState(id);
  // const [dob, setDob] = useState("");
  // const [dor, setDor] = useState("");
  // const [name, setName] = useState("");
  // const [value, setValue] = useState(null);
  var userchild = { id: uid, name: name, dob: dob, sclass: value, dor: dor };
  var date = new Date();
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: "Under KG", value: 0 },
    { label: "1st Class", value: 1 },
    { label: "2nd Class", value: 2 },
    { label: "3rd Class", value: 3 },
    { label: "4th Class", value: 4 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chaild Details </Text>
      <View style={styles.intro}>
        <Text style={styles.label}>Name: </Text>
        <TextInput
          style={styles.name}
          placeholder="Child Name"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.intro}>
        <Text style={styles.label}>DoB: </Text>
        <DatePicker
          style={styles.date}
          date={new Date("2016-07-03")}
          mode={"date"}
          onDateChange={(date) => {
            setDob(date);
            setDor(new Date());
          }}
        />
      </View>
      <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
        <Text
          style={{
            width: "30%",
            alignSelf: "flex-start",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Class:{" "}
        </Text>
        <View style={{ minHeight: 150 }}>
          <DropDownPicker
            style={{ width: "60%", alignSelf: "auto" }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // setChild={setChild}
          />
        </View>
      </View>
    </View>
  );
};
