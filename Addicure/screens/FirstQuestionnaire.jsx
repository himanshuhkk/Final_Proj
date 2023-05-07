import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import Toast from "react-native-simple-toast";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const FirstQuestionnaire = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    // console.log("A date has been picked: ", moment(date).format('LL'));
    setDob(moment(date).format("LL"));
    hideDatePicker();
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [foot, setFoot] = useState("");
  const [inches, setInches] = useState("");
  const [dob, setDob] = useState("");

  const handleNextScreen = () => {
    if (
      name === "" ||
      // age === "" ||
      weight === "" ||
      foot === "" ||
      inches === "" ||
      dob === ""
    ) {
      Toast.show("Please select the required fields", Toast.LONG, Toast.TOP, {
        backgroundColor: "blue",
      });
    } else {
      dispatch(
        setUser({
          name: name,
          // age: age,
          weight: weight,
          height: { foot: foot, inches: inches },
          dob: dob,
        })
      );
      navigation.navigate("SecondQuestionnaire");
    }
  };

  return (
    <SafeAreaView className="bg-blue-100 flex-1 justify-start items-start p-3">
      <View className="">
        <Text className="text-2xl font-semibold text-start">Addicure</Text>
        <Text className="text-xl font-semibold text-start">
          Personal Information
        </Text>
      </View>
      <View className="my-5 w-full">
        <InputFields
          Title={"Name"}
          Placeholder={"Please enter your name..."}
          onChangeText={(text) => setName(text)}
          type={"default"}
        />
        {/* <InputFields
          Title={"Age"}
          Placeholder={"Please enter your age..."}
          onChangeText={(text) => setAge(text)}
          type={"numeric"}
        /> */}
        <InputFields
          Title={"Weight"}
          Placeholder={"Please enter your weight in KG..."}
          onChangeText={(text) => setWeight(text)}
          type={"numeric"}
        />
        <View className="mb-5 space-y-2">
          <Text className="text-lg font-semibold">Height</Text>
          <View className="flex-row space-x-5">
            <TextInput
              placeholder="Enter Foot..."
              keyboardType="numeric"
              className="p-2 rounded-sm bg-white w-[150px]"
              onChangeText={(text) => setFoot(text)}
            />
            <TextInput
              placeholder="Enter Inches..."
              keyboardType="numeric"
              className="p-2 rounded-sm bg-white w-[150px]"
              onChangeText={(text) => setInches(text)}
            />
          </View>
        </View>
        {/* <InputFields
          Title={"Date Of Birth"}
          Placeholder={"Please enter your DOB..."}
          onChangeText={(text) => setDob(text)}
          type={"default"}
        /> */}
        <View>
          <Text className="text-lg font-semibold">Date of Birth</Text>
          {/* <Button title="Please enter your DOB" onPress={showDatePicker} /> */}
          <TouchableOpacity
            className="bg-white p-3 w-[200px] rounded-lg shadow-lg mt-3"
            onPress={() => showDatePicker()}
          >
            <Text className="text-black font-semibold text-base text-center">
              {dob === "" ? "Please enter your DOB" : dob}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-white p-3 w-full shadow-lg text-black"
        onPress={() => handleNextScreen()}
      >
        <Text className="font-semibold text-lg text-center">
          Next
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white p-3 w-full shadow-lg text-black mt-5"
        onPress={() => handleNextScreen()}
      >
        <Text className="font-semibold text-lg text-center"
        onPress={() => navigation.navigate("Dashboard")}
        >
          Shortcut To Dashboard
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default FirstQuestionnaire;

const InputFields = ({ Title, Placeholder, onChangeText, type }) => {
  return (
    <View className="mb-5 space-y-2">
      <Text className="text-lg font-semibold">{Title}</Text>
      <TextInput
        placeholder={Placeholder}
        keyboardType={type}
        className="p-2 rounded-sm bg-white"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
