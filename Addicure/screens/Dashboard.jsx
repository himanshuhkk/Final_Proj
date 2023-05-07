import "react-native-gesture-handler";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Diet from "../assets/diet.png";
import Face from "../assets/face.png";
import Posture from "../assets/posture.png";
import Skin from "../assets/skin.jpg";
import User from "../assets/user.png";
import Reminder from "../assets/reminder.webp";
import { FAB, Portal, Provider } from "react-native-paper";

import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";
import { SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";

import { selectUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "../components/CategoryCard";

import { createDrawerNavigator } from "@react-navigation/drawer";
import FoodCard from "../components/FoodCard";
import DialogModal from "../components/Dialog";
import Header from "../components/Header";
import { setMedical } from "../slices/medicalSlice";
const Drawer = createDrawerNavigator();

const Dashboard = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const dispatch = useDispatch();
  // console.log("Dashboard", Diet);
  const navigation = useNavigation();
  const userInfo = useSelector(selectUser);
  console.log("userInfo", userInfo);

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const [calories, setCalories] = useState("");
  const [bmi, setBmi] = useState();
  const [bmiValue, setBmiValue] = useState();
  const [bodyFat, setBodyFat] = useState();
  const [bodyFatValue, setBodyFatValue] = useState();

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

  const calculateCalories = (age, sex) => {
    if (sex === "Female") {
      if (age >= 19 && age <= 30) {
        setCalories("2000-2400");
      } else if (age >= 31 && age <= 59) {
        setCalories("1800-2200");
      } else if (age >= 60) {
        setCalories("1600-2000");
      }
    } else if (sex === "Male") {
      if (age >= 19 && age <= 30) {
        setCalories("2400-3000");
      } else if (age >= 31 && age <= 59) {
        setCalories("2200-3000");
      } else if (age >= 60) {
        setCalories("2000-2600");
      }
    }
  };

  const convertHeightInMeter = (userInfo) => {
    let foot = parseInt(userInfo?.height?.foot);
    let inch = parseInt(userInfo?.height?.inches);

    // console.log("foot", foot);
    // console.log("inch", inch);
    let height = foot * 12 + inch;
    // console.log("height", height);
    let heightInMeter = height * 0.0254;
    // console.log("heightInMeter", heightInMeter);
    return heightInMeter;
  };

  const calculateBMI = (userInfo) => {
    let weightValue = parseInt(userInfo?.weight);
    let heightValue = convertHeightInMeter(userInfo);
    // console.log("heightValue", heightValue);
    // console.log("weightValue", weightValue);
    let bmi = weightValue / (heightValue * heightValue);
    setBmi(bmi);
    validateBmi(bmi);
  };

  const validateBmi = (bmi) => {
    if (bmi < 18.5) {
      setBmiValue("Underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiValue("Ideal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiValue("Overweight");
    } else if (bmi >= 30) {
      setBmiValue("Obese");
    }
  };

  const calculateBodyFat = (userInfo) => {
    let weightValue = parseInt(userInfo?.weight);
    if (userInfo?.sex === "Male") {
      let bodyFat = weightValue * 0.732 + 8.987;
      setBodyFat(bodyFat);
      validateBodyFat(bodyFat);
    } else {
      let bodyFat = weightValue * 1.082 + 94.42;
      setBodyFat(bodyFat);
      validateBodyFat(bodyFat);
    }
  };

  const validateBodyFat = (bodyFat) => {
    if (userInfo?.sex === "Male") {
      if (bodyFat === 10 && bodyFat <= 12) {
        setBodyFatValue("Essential Fat");
      } else if (bodyFat === 14 && bodyFat <= 20) {
        setBodyFatValue("Athletes");
      } else if (bodyFat === 21 && bodyFat <= 24) {
        setBodyFatValue("Fitness");
      } else if (bodyFat === 25 && bodyFat <= 31) {
        setBodyFatValue("Average");
      } else if (bodyFat >= 32) {
        setBodyFatValue("Obese");
      }
    } else {
      if (bodyFat === 2 && bodyFat <= 4) {
        setBodyFatValue("Essential Fat");
      } else if (bodyFat === 6 && bodyFat <= 13) {
        setBodyFatValue("Athletes");
      } else if (bodyFat === 14 && bodyFat <= 17) {
        setBodyFatValue("Fitness");
      } else if (bodyFat === 18 && bodyFat <= 25) {
        setBodyFatValue("Average");
      } else if (bodyFat >= 26) {
        setBodyFatValue("Obese");
      }
    }
  };

  useEffect(() => {
    calculateCalories(calculateAge(userInfo?.dob), userInfo?.sex?.toString());
    calculateBMI(userInfo, userInfo);
    calculateBodyFat(userInfo);
    setTimeout(() => {
      setVisible(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (bmi && bmiValue && bodyFat && bodyFatValue) {
      dispatch(
        setMedical({
          bmi: bmi,
          bmiValue: bmiValue,
          bfp: bodyFat,
          bfpValue: bodyFatValue,
        })
      );
    }
  }, [bmi, bmiValue, bodyFat, bodyFatValue]);

  const featuresList = [
    {
      id: 1,
      feature: "Diet Recommendation",
      screen: "Diet Recommendation",
      image: Diet,
    },
    {
      id: 2,
      feature: "Face Recognition",
      screen: "Face Recognition",
      image: Face,
    },
    {
      id: 3,
      feature: "Skin Problem",
      screen: "Skin Problem",
      image: Skin,
    },
    {
      id: 4,
      feature: "Posture Correction",
      screen: "Posture Correction",
      image: Posture,
    },
    {
      id: 5,
      feature: "Custom Reminders",
      screen: "Custom Reminders",
      image: Reminder,
    },
  ];

  return (
    <Provider>
      <Portal>
        <SafeAreaView className="bg-white flex-1 justify-start items-start p-3">
          {visible && <DialogModal visible={visible} hideDialog={hideDialog} />}
          <View className="-z-10">
            <Header
              image={User}
              userInfo={userInfo}
              navigation={navigation}
              calories={calories}
              bmi={bmi}
              bmiValue={bmiValue}
              bodyFat={bodyFat}
              bodyFatValue={bodyFatValue}
            />
            <ScrollView
              vertical
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 0,
              }}
            >
              <Text className="mx-3 text-xl font-semibold text-gray-400">
                Recommended Diet
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  // paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <View className="flex-row p-3">
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <FoodCard key={index} imageUrl={Diet} title="Food" />
                    ))}
                </View>
              </ScrollView>
              <View className="">
                <Text className="mx-3 text-xl font-semibold text-gray-400">
                  Main Features
                </Text>
                <View className="flex-row p-3">
                  {featuresList.slice(0, 2).map((item, index) => (
                    <CategoryCard
                      key={index}
                      imageUrl={item.image}
                      title={item.feature}
                      screen={item.screen}
                    />
                  ))}
                </View>
                <View className="flex-row p-3">
                  {featuresList.slice(2, 4).map((item, index) => (
                    <CategoryCard
                      key={index}
                      imageUrl={item.image}
                      title={item.feature}
                      screen={item.screen}
                    />
                  ))}
                </View>
              </View>
              <View className="">
                <Text className="mx-3 text-xl font-semibold text-gray-400">
                  Other Features
                </Text>
                <View className="flex-row p-3">
                  {featuresList.slice(4, 5).map((item, index) => (
                    <CategoryCard
                      key={index}
                      imageUrl={item.image}
                      title={item.feature}
                      screen={item.screen}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
        <FAB.Group
          open={open}
          visible
          icon={open ? "cancel" : "plus"}
          actions={[
            { icon: "plus", label: "Start Over", onPress: () => navigation.navigate("FirstQuestionnaire") },
            {
              icon: "bell",
              label: "Custom Reminder",
              onPress: () => navigation.navigate("Custom Reminders"),
            },
            {
              icon: "doctor",
              label: "Medical Report",
              onPress: () => navigation.navigate("Medical Report"),
            },
            {
              icon: "email",
              label: "Daily Quiz",
              onPress: () => setVisible(true),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default Dashboard;

// const CategoryCard = ({ imageUrl, title, screen }) => {
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacity
//       className="mx-3 relative"
//       onPress={() => navigation.navigate(screen)}
//     >
//       <Image source={imageUrl} className="h-32 w-32 rounded" />
//       <Text className="absolute bottom-1 left-1 text-white font-bold">
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({});
