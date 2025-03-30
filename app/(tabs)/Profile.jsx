import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { getLocalStorage } from './../../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Profile() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
}, [])


const getUserDetails = async() =>{
    const UserInfo = await getLocalStorage('userDetail');
    setUser(UserInfo);
}

const handleLogout = async () => {
  try {
    await signOut(auth); // Sign out the user
    router.replace('/login'); // Navigate to the login screen
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <View style={{
      padding: 20,
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
      display:'flex',
    }}>
      <Text style={{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#7a7a7a',
        marginBottom: 10
      }}>Profile</Text>

      <View style={styles.profileContainer}>
          <Image 
          source={require('./../../assets/images/smiley.png')}
          style={{
            width: 60,
            height: 60,
            marginBottom: 10
          }}/>
          <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
            {user?.displayName}
          </Text>
          <Text style={{color:Colors.DARK_GRAY}}>
            {user?.email}
          </Text>
      </View>
      <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navigationBtn}
          onPress={() => router.push('/add-new-medication')}>
            <Ionicons name="add-circle" size={36} color= {Colors.PRIMARY} />
            <Text style={{fontSize:16}}>Add New Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationBtn}
          onPress={() => router.push('(tabs)')}>
            <Ionicons name="medkit" size={36} color= {Colors.PRIMARY} />
            <Text style={{fontSize:16}}>My Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationBtn}
          onPress={() => router.push('/History')}>
            <FontAwesome name="history" size={36} color= {Colors.PRIMARY} />
            <Text style={{fontSize:16}}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationBtn}
          onPress={() => handleLogout()}>
            <MaterialIcons name="logout" size={36} color= {Colors.PRIMARY} />
            <Text style={{fontSize:16}}>Logout</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer:{
    padding : 30,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  navigationContainer:{
    display:'flex',
    marginTop: 20,
  },
  navigationBtn:{
    display:'flex',
    flexDirection:'row',
    gap: 25,
    alignItems:'center',
    padding: 20,
    width: '100%'
  }
})
