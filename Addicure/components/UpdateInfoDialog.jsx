import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  Dialog,
  Portal,
  Text,
  List,
  RadioButton,
  TextInput,
} from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-simple-toast";

const UpdateInfoDialog = ({ visible, hideDialog, infoType }) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [value, setValue] = React.useState("first");

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [foot, setFoot] = useState("");
  const [inches, setInches] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [goal, setGoal] = useState("");
  const [desiredGoal, setDesiredGoal] = useState("");

  const handleUpdateInfo = () => {
    console.log("infoType", infoType.toLowerCase());
    switch (infoType.toLowerCase()) {
      case "name":
        if (name === "") {
          Toast.show("Please enter a name");
        } else {
          console.log("name", name);
          hideDialog();
        }
        break;
      case "weight":
        if (weight === "") {
          Toast.show("Please enter a weight");
        } else {
          console.log("weight", weight);
          hideDialog();
        }
        break;
      case "height":
        if (foot === "" || inches === "") {
          Toast.show("Please enter a height");
        } else {
          console.log("height", `${foot} ft ${inches} in`);
          hideDialog();
        }
        break;
      case "dob":
        if (dob === "") {
          Toast.show("Please enter a date of birth");
        } else {
          console.log("dob", dob);
          hideDialog();
        }
        break;
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          className="rounded-xl mx-3 mb-[250px]"
        >
          <Dialog.Title>Update {infoType}</Dialog.Title>
          <Dialog.ScrollArea className="h-[120px] px-3">
            <TextInput
              mode="outlined"
              label={`${infoType}`}
              placeholder={`Enter ${infoType}...`}
              keyboardType="numeric"
              // right={<TextInput.Affix text="/100" />}
            />
          </Dialog.ScrollArea>
          <Dialog.Actions className="space-x-5 mx-3 px-3 py-5">
            <TouchableOpacity onPress={hideDialog}>
              <Text className="p-3 bg-gray-300 rounded-lg w-[80px] text-center">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdateInfo()}>
              <Text className="p-3 bg-gray-300 rounded-lg w-[80px] text-center">
                Ok
              </Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

export default UpdateInfoDialog;

const styles = StyleSheet.create({});
