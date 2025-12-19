import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';

export default function Register() {

    const [isChecked, setChecked] = useState(false);

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
                    placeholder='Email' 
                    id='email' 
                    placeholderTextColor="#ffffff">
                </TextInput>

                <TextInput className='text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg' 
                    placeholder='Password' 
                    id='password' 
                    placeholderTextColor="#ffffff">
                </TextInput>

                <View className='flex-2 flex-row gap-3'>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text className='text-white'>Accept <Link href={'terms'} className='underline'>Terms and Conditions</Link></Text>
                </View>

                <Text className='bg-[#8CEB11] text-white text-2xl font-bold rounded-lg p-2' id='loginBtn'>Register</Text>

                <View className='items-center gap-2'>
                    <Text className='text-white'>have an account?</Text>
                    <Link href="login" className='text-blue-400 font-bold underline'>Login here</Link>
                </View>

            </View>
        </View>
    );
}