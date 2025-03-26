import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function loginScreen() {

  const router = useRouter();

  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 30,
      }}>
        <Image source={require('./../../assets/images/login.png')}
        style={styles?.image} />
      </View>
      <View style={{
        padding:25,
        backgroundColor: Colors.PRIMARY,
        height:'100%',
      }}>
        <Text style={{
          fontSize:30,
          fontWeight:'bold',
          color:'white',
          textAlign:'center',
        }}>
          Stay on Track, Stay Healthy!
        </Text>

        <Text style={{
          color:'white',
          textAlign:'center',
          fontSize:17,
          marginTop:15,
        }}>
          Track your meds, take control of your health, Stay constient,Stay confident
        </Text>

        <TouchableOpacity style={styles?.button}
        onPress={()=> router.push("login/signin")}>
          <Text style={
            {
              color:Colors.PRIMARY,
              textAlign:'center',
              fontSize:16,
              fontWeight:'bold',}
          }>Continue</Text>
        </TouchableOpacity>

        <Text style={{color:'white',textAlign:'center',marginTop:10}}>
          Note: By clicking the Continue button you agree to our terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image:{
    width: 210,
    height: 450,
    borderRadius: 20,
  },
  button:{
    padding:15,
    backgroundColor:'white',
    borderRadius: 99,
    marginTop: 20,
  }
})
