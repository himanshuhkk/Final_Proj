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

const ThirdQuestionnaire = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [goal, setGoal] = useState("");
  const [desiredGoal, setDesiredGoal] = useState("");
  const [active, setActive] = useState(false);

  console.log("desiredGoal", desiredGoal);

  const handleNextScreen = () => {
    if (goal === "" && desiredGoal === "") {
      Toast.show("Please select the option first", Toast.LONG, Toast.TOP, {
        backgroundColor: "blue",
      });
    } else {
      dispatch(
        setUser({
          goal: goal,
          desiredGoal: desiredGoal,
        })
      );
      navigation.navigate("Dashboard");
    }
  };

  const handleSelectOption = (goalType) => {
    setGoal(goalType);
    setActive(true);
  };

  return (
    <SafeAreaView className="bg-blue-100 flex-1 justify-start items-start p-3">
      <View>
        <Text className="text-2xl mt-10 font-semibold">
          What goal do you have in your mind?
        </Text>
      </View>
      <View className="space-y-5 my-10 w-full">
        <TouchableOpacity
          className="bg-white rounded-md p-10 w-full shadow-sm"
          onPress={() => handleSelectOption("Loss Weight")}
        >
          <Text className="text-black font-semibold text-xl text-center">
            Loss Weight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-md p-10 w-full shadow-sm"
          onPress={() => handleSelectOption("Maintain Weight")}
        >
          <Text className="text-black font-semibold text-xl text-center">
            Maintain Weight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-md p-10 w-full shadow-sm"
          onPress={() => handleSelectOption("Gain Weight")}
        >
          <Text className="text-black font-semibold text-xl text-center">
            Gain Weight
          </Text>
        </TouchableOpacity>
      {active && (
        <View className="mt-5 space-y-2">
          <Text className="text-lg font-semibold">Desired Weight Goal</Text>
          <TextInput
            placeholder={"Enter your weight goal..."}
            keyboardType={"numeric"}
            className="p-2 rounded-sm bg-white"
            onChangeText={(text) => setDesiredGoal(text)}
          />
        </View>
      )}
      </View>
      <TouchableOpacity
        className="bg-white p-3 w-full shadow-lg text-black"
        onPress={() => handleNextScreen()}
      >
        <Text className="font-semibold text-lg text-center">Next</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ThirdQuestionnaire;

const styles = StyleSheet.create({});
