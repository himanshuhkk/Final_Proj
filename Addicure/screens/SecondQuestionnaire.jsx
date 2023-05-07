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

const SecondQuestionnaire = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [sex, setSex] = useState("");

  const handleNextScreen = () => {
    if (sex === "") {
      Toast.show("Please select the option first", Toast.LONG, Toast.TOP, {
        backgroundColor: "blue",
      });
    } else {
      dispatch(
        setUser({
          sex: sex,
        })
      );
      navigation.navigate("ThirdQuestionnaire");
    }
  };

  return (
    <SafeAreaView className="bg-blue-100 flex-1 justify-start items-start p-3">
      <View>
        <Text className="text-2xl mt-10 font-semibold">
          What sex should we use to calculate your recommendations?
        </Text>
      </View>
      <View className="space-y-5 my-10 w-full">
        <TouchableOpacity
          className="bg-white rounded-md p-10 w-full shadow-sm"
          onPress={() => setSex("Male")}
        >
          <Text className="text-black font-semibold text-xl text-center">
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            className="bg-white rounded-md p-10 w-full shadow-sm"
          onPress={() => setSex("Female")}
        >
          <Text className="text-black font-semibold text-xl text-center">
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-white p-3 w-full shadow-lg text-black"
        onPress={() => handleNextScreen()}
      >
        <Text className="font-semibold text-lg text-center">
          Next
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SecondQuestionnaire;

const styles = StyleSheet.create({});
