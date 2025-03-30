import { View, Text, TouchableOpacity,FlatList} from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';
import MedicationList from '../../components/MedicationList';

export default function HomeScreen() {
  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
      <View style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
      }}>
        <Header/>
        <MedicationList/>
      </View>
    }
    />
    
  );
}