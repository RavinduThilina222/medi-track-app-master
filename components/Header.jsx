import { View, Text ,Image, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default function Header() {

    const [user, setUser] = React.useState();

    useEffect(() => {
        getUserDetails();
    }, [])
    

    const getUserDetails = async() =>{
        const UserInfo = await getLocalStorage('userDetail');
        setUser(UserInfo);
    }

    
  return (
    <View style={{
        marginTop: 10,
    }}>
       <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
       }}> 
        <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <Image
        source={require('../assets/images/smiley.png')}
        style={{ 
            width: 40,
            height:40 
        }}
        />
        <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
        }}>Hello {user?.displayName} 👋</Text>
        <Ionicons name="settings-outline" size={34} color={Colors.DARK_GRAY} />
        </View> 



        
        </View>
    </View>
  );
}