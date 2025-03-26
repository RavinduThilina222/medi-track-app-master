import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';

export default function HomeScreen() {
  return (
    <View style={{
      padding: 15,
      backgroundColor: 'white',
      height: '100%',
      width: '100%'
    }}>
      <Header/>
      <EmptyState/>
    </View>
  );
}