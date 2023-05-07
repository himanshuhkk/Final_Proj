import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CategoryCard = ({ imageUrl, title, screen }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        className="mx-3 relative"
        onPress={() => navigation.navigate(screen)}
      >
        <Image source={imageUrl} className="h-32 w-32 rounded" />
        <Text className="absolute bottom-1 left-1 text-white font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

export default CategoryCard

const styles = StyleSheet.create({})