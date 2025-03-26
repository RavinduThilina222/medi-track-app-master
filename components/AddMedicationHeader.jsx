import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AddMedicationHeader() {
  const navigation = useNavigation(); // Use useNavigation to access navigation methods

  return (
    <View>
      <Image 
        source={require('./../assets/images/consult.png')}
        style={{
          height: 220,
          width: '100%',
        }}
      /> 

      <TouchableOpacity
        style={{ position: 'absolute', padding: 25 }}
        onPress={() => navigation.goBack()} // Use navigation.goBack to navigate back
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}