import { View, Text,Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const MedicationCardItem = ({medicine,selectedDate = ''}) => {

  const [status,setStatus] = useState();

  const checkStatus = () => {
    if (Array.isArray(medicine?.action)) {
      const data = medicine.action.find((item) => item.date === selectedDate);
      console.log("--", data);
      setStatus(data);
    } else {
      console.warn("medicine.action is not an array or is undefined");
      setStatus(undefined); // Reset status if action is invalid
    }
  };

  useEffect(()=>{
    checkStatus();
  },[medicine])
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

        {status?.date && (
          <View style={styles.statusContainer}>
            {status?.status === 'Taken' ? (
              <Ionicons name="checkmark-circle" size={20} color={Colors.GREEN} />
            ) : status?.status === 'Missed' ? (
              <Ionicons name="close-circle" size={20} color="red" />
            ) : null}
          </View>
        )}
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
    padding:10,
    backgroundColor:'white',
    borderRadius:15,
    alignItems:'center',
    marginLeft:5
  },
  statusContainer:{
    position:'absolute',
    top:5,
    padding:7
  }
})
