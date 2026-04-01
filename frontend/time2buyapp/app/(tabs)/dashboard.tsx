import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface User {
    name: string;
    email: string; 
    password: string;
}

export default function Dashboard() {

    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect (() => {
        const fetchUserData = async () => {
            const id = await SecureStore.getItemAsync('userId');
            const token = await SecureStore.getItemAsync('userToken');

            const response = await fetch(`http://10.0.2.2:8000/api/fetchUserData/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            if (!response.ok) {
                router.replace('/login?error=403');
            }
            setUserData(data);
        }

        fetchUserData();
    }, []);

    const HandleLogout = async () => {
        if (userData) {
            setUserData(null);
            SecureStore.deleteItemAsync('userId');
            SecureStore.deleteItemAsync('userToken');
            router.replace('/login');
        }
    }

    return (
        <View className='flex-1 items-center justify-center bg-[#1A1A1B]'>
            <Text className='text-3xl text-white'>This is the dashboard</Text>
            <Text className='text-xl text-white'>Welcome {userData ? userData.name : 'Loading...'}</Text>
            <Text className='text-lg text-white font-bold bg-red-500 rounded-lg p-2 mt-4' onPress={HandleLogout}>Logout</Text>
        </View>
    );
}