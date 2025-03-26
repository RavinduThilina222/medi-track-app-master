import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ConstantString from '../constants/ConstantString';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function EmptyState() {
    const router = useRouter();
  return (
    <View style={{
        marginTop:80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
      <Image
        source={require('../assets/images/medicine.png')}
        style={{
          width: 120,
          height: 120,
          alignSelf: 'center',
          marginTop: 25
        }}
        />
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 30,
        }}>
            {ConstantString.NoMedication}
        </Text>

        <Text style={{
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
            color: Colors.DARK_GRAY
        }}>
            {ConstantString.MedicationSubText}
        </Text>

        <TouchableOpacity style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
            width:'100%'
        }}
        onPress={()=> router.push('/add-new-medication')}>
            <Text style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 14,
            }}>
                {ConstantString.AddNewMediciationBtn}
            </Text>
        </TouchableOpacity>
    </View>
  );
}