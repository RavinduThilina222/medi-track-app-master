import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter, Slot } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function _layout() {

  const router = useRouter();
  
  useEffect(() => {
    GetUserDetail();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
    });
  }, []);
  const GetUserDetail=async() => {
    const userInfo = getLocalStorage('useDetail');
    if(!userInfo){
      router.replace('/login');
    }
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='index'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
          )
        }} />
      <Tabs.Screen name='History'
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={24} color={color} />
          )
        }} />
      <Tabs.Screen name='Profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          )
        }} />
      <Slot />
    </Tabs>
  );
}