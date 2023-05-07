import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Dialog,
  Portal,
  Text,
  List,
  RadioButton,
  TextInput,
} from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

const DialogModal = ({ visible, hideDialog }) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [value, setValue] = React.useState("first");

  const QuizQuestions = [
    {
      id: 1,
      title: "Morning Diet",
      options: ["First Food Item", "Second Food Item", "Third Item", "Fourth Item", "Add Custom"],
    },
    {
      id: 2,
      title: "Afternoon Diet",
      options: ["First Food Item", "Second Food Item", "Third Item", "Fourth Item", "Add Custom"],
    },
    {
      id: 3,
      title: "Evening Diet",
      options: ["First Food Item", "Second Food Item", "Third Item", "Fourth Item", "Add Custom"],
    },
    {
      id: 4,
      title: "Night Diet",
      options: ["First Food Item", "Second Food Item", "Third Item", "Fourth Item", "Add Custom"],
    },
  ];

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} className="rounded-xl mx-3"
        >
          <Dialog.Title>Routien Diet Quiz</Dialog.Title>
          <Dialog.ScrollArea className="h-[320px] px-3">
            <ScrollView>
              {QuizQuestions.map((item, index) => (
                <List.Section>
                  <List.Accordion
                    title={item.title}
                    left={(props) => <List.Icon {...props} icon="food" />}
                    // onPress={handlePress}
                  >
                    <RadioButton.Group
                      onValueChange={(newValue) => setValue(newValue)}
                      value={value}
                    >
                      <View className="p-3">
                        {item.options.map((option, index) => (
                          <View className="flex-row items-center justify-start">
                            <RadioButton
                              value={option.toLowerCase()}
                              color="#000"
                            />
                            <Text>{option}</Text>
                          </View>
                        ))}
                        {value === "add custom" && (
                          <View className="">
                            <TextInput
                              mode="outlined"
                              label="Food Item"
                              placeholder="type food item name"
                              keyboardType="default"
                              // right={<TextInput.Affix text="/100" />}
                            />
                            <TextInput
                              mode="outlined"
                              label="Calory Count"
                              placeholder="type calory count"
                              keyboardType="numeric"
                              // right={<TextInput.Affix text="/100" />}
                            />
                          </View>
                        )}
                      </View>
                    </RadioButton.Group>
                  </List.Accordion>
                </List.Section>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions className="space-x-5 mx-3 px-3 py-5">
            <TouchableOpacity onPress={hideDialog}>
              <Text className="p-3 bg-gray-300 rounded-lg w-[80px] text-center">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideDialog}>
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

export default DialogModal;

const styles = StyleSheet.create({});
