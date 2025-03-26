import { View, Text, StyleSheet,TextInput,FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { TypeList, WhenToTake } from '../constants/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { formatDate,formatDateForText,formatTime,getDatesRange } from '../service/ConvertDateTime';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import {getLocalStorage} from '../service/Storage';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function AddMedicationForm() {
    const [formData,setFormData] = useState();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showReminderTime, setShowReminderTime] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onHandleInputChange = (field,value) => {
        setFormData(prev=> ({
            ...prev,
            [field]:value
        }))
        console.log(formData)
    } 

    const saveMedication = async () => {
        console.log('saveMedication function called'); // Debug log
        const docId = Date.now().toString();
        console.log('Generated docId:', docId); // Debug log
        let user;
    
        try {
            user = await getLocalStorage('userDetail');
            console.log('Retrieved user:', user); // Debug log
            if (!user) {
                Alert.alert('Error', 'User information is missing. Please log in again.');
                return;
            }
        } catch (error) {
            console.error('Error retrieving user from local storage:', error);
            Alert.alert('Error', 'Failed to retrieve user information.');
            return;
        }
    
        if (!user || !user.email) {
            console.error('User object is invalid:', user);
            Alert.alert('Error', 'User is not logged in or email is missing.');
            return;
        }
    
        console.log('Validating form data:', formData); // Debug log
        if (!(formData?.name && formData?.type && formData?.does && formData?.when && formData?.startDate && formData?.endDate && formData?.reminder)) {
            Alert.alert('All fields are required');
            return;
        }
    
        const dates = getDatesRange(formData.startDate, formData.endDate);
        console.log('Generated dates:', dates); // Debug log
        setLoading(true);
        console.log('Saving medication to Database...'); // Debug log
    
        try {
            await setDoc(doc(db, 'medications', docId), {
                ...formData,
                userEmail: user.email,
                docId: docId,
                dates: dates,
            });
            console.log('Medication saved successfully'); // Debug log
    
            setLoading(false);
            Alert.alert('Great!', 'New Medication Added Successfully', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/(tabs)');
                    },
                },
            ]);
        } catch (error) {
            setLoading(false);
            console.error('Error adding medication:', error);
            Alert.alert('Error Adding Medication', error.message);
        }
    };


  return (
    <View style={{
        padding:25
    }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
        <TextInput style={styles.TextInput}placeholder='Medicine Name'
        onChangeText={(value => onHandleInputChange('name',value))}/>
      </View>

      <FlatList 
      data={TypeList}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => (
        <TouchableOpacity style={[styles.inputGroup,{marginRight:10,marginTop:5},
            {backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : Colors.WHITE}
        ]}
        onPress={() => onHandleInputChange('type',item)}>
        <Text style={[styles.typeText,
            {color:item.name === formData?.type?.name ? 'white' : 'black'}
        ]}>{item?.name}</Text>
        </TouchableOpacity>
      )}
      />

    <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
        <TextInput style={styles.TextInput}placeholder='Does Ex: 2, 5ml'
        onChangeText={(value => onHandleInputChange('does',value))}/>
      </View>

        <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
        <Picker 
        selectedValue={formData?.when}
        onValueChange={(value) => onHandleInputChange('when',value)}
        style={{
            width:'90%',
        }}>
            {WhenToTake.map((item,index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
        </Picker>

        </View>

      <View style={styles.DateGroup}>
        <TouchableOpacity style={[styles.inputGroup,{flex:1}]} 
        onPress={() => setShowStartDate(true)}>
        <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
        <Text style={[styles.text]}>{formatDateForText(formData?.startDate)??'Start Date'}</Text>
        
        </TouchableOpacity>
        {showStartDate && (
        <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
            onHandleInputChange('startDate',formatDate(event.nativeEvent.timestamp));
            setShowStartDate(false);
            }}
            value={new Date(formData?.startDate )?? new Date()}
        />
        )}

        <TouchableOpacity style={[styles.inputGroup,{flex:1}]} 
        onPress={() => setShowEndDate(true)}>
        <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
        <Text style={[styles.text]}>{formatDateForText(formData?.endDate)??'End Date'}</Text>
        
        </TouchableOpacity>
        {showEndDate && (
        <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
            onHandleInputChange('endDate',formatDate(event.nativeEvent.timestamp));
            setShowEndDate(false);
            }}
            value={new Date(formData?.EndDate)?? new Date()}
        />
        )}
      
    </View>
        {/*Set Reminder */}
        <View style={styles.DateGroup}>
            <TouchableOpacity style={[styles.inputGroup,{flex:1}]} 
            onPress={() => setShowReminderTime(true)}>
            <Ionicons style={styles.icon} name="timer-outline" size={24} color="black" />
            <Text style={[styles.text]}>{formData?.reminder??'Select Reminder Time'}</Text>
            
            </TouchableOpacity>
        </View>

        {showReminderTime&&
        <RNDateTimePicker
            mode='time'
            onChange={(event) => {
                onHandleInputChange('reminder',formatTime(event.nativeEvent.timestamp));
                setShowReminderTime(false);
            }}
            value={new Date(formData?.reminder)??new Date()}
        />}

        <TouchableOpacity style={styles.button} 
        onPress={() => {
            console.log('Button pressed'); // Debug log
            saveMedication();
        }}>
            {loading? <ActivityIndicator size={'large'} color={'white'} />:
            <Text style={styles.buttonText}>Add New Medicine</Text>}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    header:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputGroup:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        borderRadius:8,
        borderWidth:1,
        borderColor:Colors.LIGHT_GRAY_BORDER,
        backgroundColor:'white',
        marginTop:10
    },
    TextInput:{
        marginLeft:10,
        fontSize:16,
        flex:1,
    },
    icon:{
        color:Colors.PRIMARY,
        borderRightWidth:1,
        paddingRight:15,
        borderRightColor:Colors.GRAY
    },
    typeText:{
        fontSize:14,
    },
    text:{
        fontSize:15,
        flex:1,
        marginLeft:10,
    },
    DateGroup:{
       flexDirection:'row',
       gap:10, 
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        width:'100%',
        alignItems:'center',
        marginTop:15,
    },
    buttonText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    }
})