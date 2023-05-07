import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const SplashScreen = () => {
  const navigation = useNavigation();

  const userInfo = useSelector(selectUser);
  console.log("userInfo", userInfo);

  useEffect(() => {
    setTimeout(() => {
      if (
        userInfo?.name == null &&
        userInfo?.dob == null &&
        userInfo?.sex == null &&
        userInfo?.height == null &&
        userInfo?.weight == null &&
        userInfo?.goal == null
      ) {
        navigation.navigate("FirstQuestionnaire");
      } else {
        navigation.navigate("Dashboard");
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="bg-[#fff] flex-1 justify-center items-center pb-20">
      <View className="">
        <Text className="text-4xl font-semibold text-center">Addicure</Text>
        <Text className="text-xl font-semibold text-center">
          AI Health Assistant
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
