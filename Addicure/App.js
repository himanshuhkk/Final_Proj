import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import FirstQuestionnaire from "./screens/FirstQuestionnaire";
import SecondQuestionnaire from "./screens/SecondQuestionnaire";
import ThirdQuestionnaire from "./screens/ThirdQuestionnaire";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Medical_Report from "./screens/Medical_Report";
import Dashboard from "./screens/Dashboard";
import Diet_Recommendation from "./screens/Diet_Recommendation";
import Face_Recognization from "./screens/Face_Recognization";
import Skin_Problem from "./screens/Skin_Problem";
import Posture_Correction from "./screens/Posture_Correction";
import Custom_Reminders from "./screens/Custom_Reminders";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FirstQuestionnaire"
            component={FirstQuestionnaire}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SecondQuestionnaire"
            component={SecondQuestionnaire}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ThirdQuestionnaire"
            component={ThirdQuestionnaire}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Medical Report"
            component={Medical_Report}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Diet Recommendation"
            component={Diet_Recommendation}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Face Recognition"
            component={Face_Recognization}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Skin Problem"
            component={Skin_Problem}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Posture Correction"
            component={Posture_Correction}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Custom Reminders"
            component={Custom_Reminders}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
