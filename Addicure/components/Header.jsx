import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Header = ({
  image,
  userInfo,
  navigation,
  calories,
  bmi,
  bmiValue,
  bodyFat,
  bodyFatValue,
}) => {
  return (
    <View>
      <View className="mx-auto flex-row items-center space-x-2">
        <Text className="text-gray-400">--------------</Text>
        <Text className="font-bold text-2xl text-gray-400">Addicure</Text>
        <Text className="text-gray-400">--------------</Text>
      </View>
      <View className="flex-row items-center space-x-3 p-2">
        <Image
          source={image}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-base">
            Hello, {userInfo?.name || "Username"}
          </Text>
          <View className="flex-row items-center space-x-1">
            <TouchableOpacity>
              {/* <ChevronDownIcon size={20} color="#00CCBB" /> */}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          {/* <UserIcon size={30} color="#00CCBB" /> */}
        </TouchableOpacity>
      </View>
      <View className="px-3 mb-3 space-y-2">
        <Text className="font-bold text-gray-400 text-base">
          {userInfo?.goal || "GOAL TYPE"}, is your fitness goal.
        </Text>
        {/* <Text className="font-bold text-gray-400 text-xs">
          Your current BMI is {bmi != NaN ? parseFloat(bmi).toFixed(2) : "ANY"}{" "}
          which means you are {bmiValue || "ANY"}.
        </Text>
        <Text className="font-bold text-gray-400 text-xs">
          Your current BFP is {bodyFat != NaN ? parseFloat(bodyFat).toFixed(2) : "ANY"}{" "}
          which means you are {bodyFatValue || "ANY"}.
        </Text> */}
      </View>
      <View className="flex-row items-center space-x-2 mx-2 pb-2">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-2 rounded-md">
          {/* <SearchIcon color="gray" size={20} /> */}
          <TextInput
            placeholder="Search here..."
            keyboardType="default"
            className="flex-1"
          />
        </View>
        <TouchableOpacity>
          {/* <AdjustmentsIcon color="#00CCBB" /> */}
        </TouchableOpacity>
      </View>
      <View className="mx-auto flex-row items-center space-x-5 my-5">
        <View className="flex-col items-center">
          <Text className="font-bold text-gray-400 text-base">2000</Text>
          <Text className="font-bold text-gray-400 text-base">Currunt</Text>
        </View>
        <TouchableOpacity
        // onPress={() => navigation.navigate("Medical Report")}
        >
          <View className="border-2 border-gray-400 flex items-center justify-center rounded-full h-32 w-32">
            <Text className="font-bold text-gray-400 text-base">
              {calories || "Any Count"}
            </Text>
            <Text className="font-bold text-gray-400 text-base">
              Daily Calories
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-col items-center">
          <Text className="font-bold text-gray-400 text-base">500 </Text>
          <Text className="font-bold text-gray-400 text-base">Required</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
