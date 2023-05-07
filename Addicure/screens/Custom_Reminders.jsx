import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Toast from "react-native-simple-toast";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Custom_Reminders = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState("");
  const [reminderType, setReminderType] = useState("");
  const [reminderList, setReminderList] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A date has been picked: ", time);
    // console.log("A date has been picked: ", moment(date).format('LL'));
    setTime(moment(time).format("LTS"));
    hideDatePicker();
  };

  const handleAddReminderToList = (reminderType) => {
    if (reminderList.length > 0) {
      reminderList.forEach((item, index) => {
        if (item === reminderType) {
          Toast.show(
            "Toast already exists in the list. Please enter a new reminder type.",
            Toast.LONG,
            Toast.TOP,
            {
              backgroundColor: "blue",
            }
          );
        } else {
          setReminderList([...reminderList, reminderType]);
          setTime("");
          // setReminderType("");
        }
      });
    } else {
      setReminderList([...reminderList, reminderType]);
      setTime("");
      // setReminderType("");
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-start items-start p-3">
      <View className="mx-auto">
        <View className="my-5 space-y-2">
          <Text className="text-lg font-semibold">Reminder Type</Text>
          <TextInput
            placeholder="Please enter reminder type..."
            keyboardType="default"
            className="p-2 rounded-sm bg-gray-300 w-full"
            onChangeText={(text) => setReminderType(text)}
          />
        </View>
        {reminderType != "" && (
          <TouchableOpacity className="bg-gray-300 p-3 w-[100px] rounded-lg shadow-lg mb-5">
            <Text
              className="text-black font-semibold text-base text-center"
              onPress={() => handleAddReminderToList(reminderType)}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-gray-300 p-3 w-[200px] rounded-lg shadow-lg"
          onPress={() => showDatePicker()}
        >
          <Text className="text-black font-semibold text-base text-center">
            {time === "" ? "Please select time" : time}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-300 p-3 w-[300px] rounded-lg shadow-lg mt-5"
          onPress={async () => {
            await sendPushNotification(expoPushToken, reminderType);
          }}
        >
          <Text className="text-black font-semibold text-base text-center">
            Press to Send Notification
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 0,
          }}
        >
          {reminderList.length > 0 && (
            <View className="mt-3">
              <Text className="text-lg font-semibold">Reminder List</Text>
              <View className="">
                {reminderList.map((item, index) => (
                  <View
                    key={index}
                    className="my-2 flex-row items-center justify-between bg-gray-300 p-3 w-[300px] rounded-lg shadow-lg"
                  >
                    <Text>{item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newList = reminderList.filter(
                          (item, i) => i !== index
                        );
                        setReminderList(newList);
                      }}
                    >
                      <Text className="font-semibold mx-3">X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken, reminderType);
          }}
        />
      </View> */}
    </SafeAreaView>
  );
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken, reminderType) {
  if (reminderType === "") {
    Toast.show(
      "Please enter the type of the reminder before sending the notification",
      Toast.LONG,
      Toast.TOP,
      {
        backgroundColor: "blue",
      }
    );
  } else {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: reminderType,
      body: "Please follow the reminder",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default Custom_Reminders;

const styles = StyleSheet.create({});
