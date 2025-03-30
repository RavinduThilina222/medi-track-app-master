import { View, Text, StyleSheet,Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { GetPrevDateRangeToDisplay } from '../../service/ConvertDateTime';
import { getLocalStorage } from '../../service/Storage';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import EmptyState from '../../components/EmptyState';
import MedicationCardItem from '../../components/MedicationCardItem';
import { useRouter } from 'expo-router';


export default function History() {
  const [selectedDate,setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [dateRange,setDateRange] = React.useState();
  const [loading,setLoading] = useState(false);
  const [medList, setMedList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetDateRangeList();
    getMedicationList(selectedDate);
  },[])

const GetDateRangeList = () => {
      const dateRange = GetPrevDateRangeToDisplay();
      setDateRange(dateRange);
      console.log(dateRange);
}

const getMedicationList = async() =>{
    setLoading(true)
    const user = await getLocalStorage('userDetail');
    setMedList([]);
    try {
      const q = query(collection(db,'medications'),
    where('userEmail', '==',user?.email),
    where('dates','array-contains',selectedDate))
    

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc)=> {
      console.log("docId: "+doc.id+ '==>',doc.data())
      setMedList(prev => [...prev,doc.data()])
    })
    setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <FlatList
    data={[]}
    style={{
      height:'100%',
      backgroundColor:'white',
    }}
    ListHeaderComponent={
    <View style={styles.mainContainer}>
      <Image source={require('./../../assets/images/med-history.png')}
      style={styles.imageBanner}/>

      <Text style={styles.header}>
        Medication History
      </Text>

      <FlatList
              data={dateRange}
              horizontal
              style={{marginTop:15,marginBottom:5}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=> {
                return(
                  <TouchableOpacity 
                  onPress={()=>{
                    setSelectedDate(item.formattedDate);
                    getMedicationList(item.formattedDate)
                  }} style={[styles.dateGroup, {
                    backgroundColor: item?.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER
                  }]}>
                    <Text style={[styles.day, {
                      color: item?.formattedDate == selectedDate ? 'white' : 'black'
                    }]}>{item.day}</Text>
                    <Text style={[styles.date,{
                      color: item?.formattedDate == selectedDate ? 'white' : 'black'
                    }]}>{item.date}</Text>
                  </TouchableOpacity>
                );          
            }}/>
            {medList.length>0? <FlatList
        style={{
          marginTop:10
        }}
        onRefresh={
          () => getMedicationList(selectedDate)
        }
        refreshing = {loading}
        data ={medList}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=> router.push({
            pathname:'/action-modal',
            params:{
              ...item,
              selectedDate:selectedDate
            }
        })}>
            <MedicationCardItem medicine ={item} selectedDate= {selectedDate}/>
          </TouchableOpacity>
            
          )}
        
      /> : <Text style={{
        fontSize: 18,
        color: Colors.GRAY,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
      }}>No Medications Found</Text>}
    </View>}/>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageBanner:{
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  header:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateGroup:{
      padding:10,
      backgroundColor:Colors.LIGHT_GRAY_BORDER,
      display:'flex',
      alignItems:'center',
      marginRight:10,
      borderRadius:12,
  
    },
    day:{
      fontSize:20,
      fontWeight:'bold'
    },
    date:{
      fontSize:18
    }
})
