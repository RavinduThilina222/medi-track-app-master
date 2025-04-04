import { View, Text, StyleSheet,Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import MedicationCardItem from '../../components/MedicationCardItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import moment from 'moment';

const MedicationActionModal = () => {
    const medicine = useLocalSearchParams();
    console.log(medicine);
    const router = useRouter();

    const updateActionStatus = async(status) =>{
        try {
            const docRef = doc(db,'medications',medicine?.docId);
            await updateDoc(docRef,{
                action:arrayUnion({
                    status:status,
                    time:moment().format('LT'),
                    date: medicine?.selectedDate
                })
            })

            Alert.alert(status,'Response Saved!',[
                {
                    text:'Ok',
                    onPress: ()=> router.replace('(tabs)')
                }
            ])
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.container}>
    <Image source={require('./../../assets/images/notification.gif')}
    style={{
        width:120,
        height:120
    }}/>
    <Text style={{
        fontSize:18
    }}>
        {medicine?.selectedDate}
    </Text>
    <Text style={{
        fontSize:30,
        fontWeight:'bold',
        color:Colors.PRIMARY
    }}>
        {medicine?.reminder}
    </Text>

    <Text style={{fontSize:18}}>
        It's time to take
    </Text>

    <MedicationCardItem medicine = {medicine} selectedDate= ''/>

        <View style={styles.btnCOntainer}>
            <TouchableOpacity style={styles.closeBtn}
            onPress={()=> updateActionStatus('Missed')}>
            <Ionicons name="close-outline" size={24} color="red" />
                <Text style={{fontSize:20,color:'red'}}>Missed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.successBtn}
            onPress={()=> updateActionStatus('Taken')}>
            <Ionicons name="checkmark-outline" size={24} color="white" />
                <Text style={{fontSize:20,color:'white'}}>Taken</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            position:'absolute',
            bottom:25
        }}
        onPress={()=> router.back()}>
            <Ionicons name="close-circle" size={44} color = {Colors.GRAY} />
        </TouchableOpacity>
    
    </View>
  )
}

export default MedicationActionModal

const styles = StyleSheet.create({
  container:{
    padding:17,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    height:'100%',
    width:'100%'
  },
  closeBtn:{
    padding:10,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    alignItems:'center',
    borderColor:'red',
    borderRadius:15
  },
  successBtn:{
    padding:10,
    flexDirection:'row',
    gap:6,
    alignItems:'center',
    backgroundColor:Colors.GREEN,
    borderRadius:15
  },
  btnCOntainer:{
    flexDirection:'row',
    gap:10,
    marginTop:25
  }
})
