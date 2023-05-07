import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const FoodCard = ({ imageUrl, title, screen }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        className="mx-1 relative"
        // onPress={() => navigation.navigate(screen)}
      >
        <Image source={imageUrl} className="h-20 w-20 rounded" />
        <Text className="absolute bottom-0 left-1 text-slate-400 font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

export default FoodCard

const styles = StyleSheet.create({})