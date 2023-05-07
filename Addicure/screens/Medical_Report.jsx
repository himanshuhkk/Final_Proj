import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { selectMedical } from "../slices/medicalSlice";
import UpdateInfoDialog from "../components/UpdateInfoDialog";

const Medical_Report = () => {
  const userInfo = useSelector(selectUser);
  const medicalInfo = useSelector(selectMedical);

  console.log("medicalInfo", medicalInfo);

  console.log("userInfo", userInfo);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // let age = calculateAge(userInfo?.dob);

  const BasicInfo = [
    {
      id: 1,
      title: "Name",
      info: userInfo?.name || "ANY",
    },
    {
      id: 2,
      title: "Age",
      info: calculateAge(userInfo?.dob) || "ANY",
    },
    {
      id: 3,
      title: "Current weight",
      info: userInfo?.weight || "ANY",
    },
    {
      id: 4,
      title: "Height",
      info: `${userInfo?.height?.foot || "ANY"} ft ${
        userInfo?.height?.inches || "ANY"
      } in`,
    },
    {
      id: 5,
      title: "Date of Birth",
      info: userInfo?.dob || "ANY",
    },
    {
      id: 6,
      title: "Gender",
      info: userInfo?.sex || "ANY",
    },
  ];

  const AdvanceInfo = [
    {
      id: 1,
      title: "BMI",
      info: medicalInfo?.bmi?.toFixed(2) || "ANY",
    },
    {
      id: 2,
      title: "BMI Value",
      info: medicalInfo?.bmiValue || "ANY",
    },
    {
      id: 3,
      title: "BFP",
      info: medicalInfo?.bfp?.toFixed(2) || "ANY",
    },
    {
      id: 4,
      title: "BFP Value",
      info: medicalInfo?.bfpValue || "ANY",
    },
  ];

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const [infoType, setInfoType] = React.useState("");

  return (
    <SafeAreaView className="bg-blue-100 p-3 h-screen">
      {visible && (
        <UpdateInfoDialog
          visible={visible}
          hideDialog={hideDialog}
          infoType={infoType}
        />
      )}
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 30,
        }}
        className="-z-10"
      >
        <View>
          <View className="-mt-8">
            <Text className="text-lg font-semibold text-gray-700">
              Your Goal
            </Text>
          </View>
          <View className="bg-white px-5 mt-3 rounded-xl">
            <TouchableOpacity
              onPress={() => {
                setInfoType("Goal");
                setVisible(true);
              }}
            >
              <View className="flex-row my-5 items-center justify-between">
                <Text className="flex-1 text-base font-semibold">Goal</Text>
                <Text className="text-base">{userInfo?.goal || "ANY"}</Text>
              </View>
            </TouchableOpacity>
            <View className="h-[1px] w-full bg-gray-800"></View>
            <TouchableOpacity
              onPress={() => {
                setInfoType("Gain Weight");
                setVisible(true);
              }}
            >
              <View className="flex-row my-5 items-center justify-between">
                <Text className="flex-1 text-base font-semibold">
                  {userInfo?.goal || "ANY"}
                </Text>
                <Text className="text-base">{userInfo?.desiredGoal} kg</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View className="mt-3">
            <Text className="text-lg font-semibold text-gray-700">
              Medical Info
            </Text>
          </View>
          <View className="bg-white px-5 mt-3 rounded-xl">
            {AdvanceInfo.map((item) => (
              <InfoTabs
                key={item.id}
                Title={item.title}
                Info={item.info}
                id={item.id}
                onPress={() => {
                  setInfoType(item.title)
                  setVisible(true)
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <View className="mt-3">
            <Text className="text-lg font-semibold text-gray-700">Details</Text>
          </View>
          <View className="bg-white px-5 mt-3 rounded-xl">
            {BasicInfo.map((item) => (
              <InfoTabs
                key={item.id}
                Title={item.title}
                Info={item.info}
                id={item.id}
                onPress={() => {
                  setInfoType(item.title)
                  setVisible(true)
                }}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity className="bg-white p-3 w-full my-10">
          <Text className="text-black font-semibold text-lg text-center">
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Medical_Report;

const InfoTabs = ({ Title, Info, id, onPress }) => {
  return (
    <View>
      <TouchableOpacity
      onPress={onPress}
      >
        <View className="flex-row my-5 items-center justify-between">
          <Text className="flex-1 text-base font-semibold">{Title}</Text>
          <Text className="text-base">{Info}</Text>
        </View>
      </TouchableOpacity>
      <View
        className={`h-[1px] w-full bg-gray-800 ${
          (Title === "Gender" || Title === "BFP Value") && "hidden"
        }`}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({});
