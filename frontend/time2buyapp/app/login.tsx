import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default function Login() {
    return (
        <View className='flex-1 items-center bg-[#1A1A1B]'>
            <View className='mt-[60px]'>
                <Text className='text-[#2D9CDB] font-bold text-6xl'>Time2Buy</Text>
                <Text className='text-white text-lg'>See the clock behind the price tag.</Text>
            </View>

            <View className='flex-1 items-center justify-center gap-[50px]'>
                <TextInput className='text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg' 
                    placeholder='Username' 
                    id='username' 
                    placeholderTextColor="#ffffff">
                </TextInput>

                <TextInput className='text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg' 
                    placeholder='Password' 
                    id='password' 
                    placeholderTextColor="#ffffff">
                </TextInput>

                <Text className='bg-[#8CEB11] text-white text-2xl font-bold rounded-lg p-2' id='loginBtn'>Login</Text>

            </View>
        </View>
    );
}