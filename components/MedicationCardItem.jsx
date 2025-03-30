import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const MedicationCardItem = ({medicine}) => {
  return (
    <View style={styles.container}> 
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
            <Image source={{uri:medicine?.type?.icon}}
            style={{
                width:60,
                height:60,
                borderRadius:10,
                marginRight:10
            }}/>
        </View>
        <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>
                {medicine?.name}
            </Text>
            <Text style={{fontSize:14}}>
                {medicine?.when}
            </Text>
            <Text style={{color: 'white'}}>
                
                {medicine?.does}  {medicine?.type.name}
            </Text>
        </View>
      </View>
        <View style={styles.reminder}>
        <Ionicons name="timer-outline" size={20} color="black" />
                <Text style={{fontWeight:'bold',fontSize:15}}>
                    {medicine?.reminder}
                </Text>
            </View>
    </View>
  )
}

export default MedicationCardItem;


const styles = StyleSheet.create({
  imageContainer:{
    padding:10,
    backgroundColor:'white',
    borderRadius:15,
    marginRight:15
  },
  subContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  container:{
    padding:10,
    backgroundColor:Colors.LIGHT_PRIMARY,
    marginTop:10,
    borderRadius:10,
    borderWidth:2,
    borderColor:Colors.LIGHT_GRAY_BORDER,
    marginRight:15,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    alignItems:'center'
  },
  reminder:{
    padding:12,
    backgroundColor:'white',
    borderRadius:15,
    alignItems:'center'
  }
})
