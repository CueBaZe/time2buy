import React, { use, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetch } from 'expo/fetch';
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const [generalError, setGenerealError] = useState<string>('');
    
    const router = useRouter();

    const HandleLogin = async () =>  {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    name: name,
                    password: password
                }),
            });
            setErrors({});
            setGenerealError('');

            const data = await response.json();

            if (!response.ok) {
                //check errors
                if (response.status === 422) {
                    setErrors(data.errors);
                } else if (response.status === 401) {
                    setGenerealError(data.message);
                }
                return; 
            }

            await SecureStore.setItemAsync('userToken', String(data.userToken));
            await SecureStore.setItemAsync('userId', String(data.userId));
            
            router.replace('/dashboard')

        } catch (networkErrors) {
            setGenerealError('Server Error:' + networkErrors);
        }
    }

    return (
        <View className='flex-1 items-center bg-[#1A1A1B]'>
            <View className='mt-[60px]'>
                <Text className='text-[#2D9CDB] font-bold text-6xl'>Time2Buy</Text>
                <Text className='text-white text-lg'>See the clock behind the price tag.</Text>
            </View>

            <View className={`mt-[50px] border bg-[#282829] p-2 rounded-2xl ${generalError ? '' : 'invisible'}`} id='errorBox'>
                <Text id='ErrorText' className={`text-white text-md`}><Ionicons name="information-circle" size={18} color="red" />{generalError ? generalError : ''}</Text>
            </View>

            <View className='flex-1 items-center text-center justify-center gap-[30px]'>
                <View className='items-center'>
                    <TextInput className={`text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                        placeholder='Username or Email' 
                        id='name'
                        value={name}
                        onChangeText={setName} 
                        placeholderTextColor="#ffffff">
                    </TextInput>

                    <Text className='text-red-500 mt-2'>{errors.name ? errors.name[0] : ''}</Text>
                </View>
                
                <View className='items-center '>
                    <TextInput className={`text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.password ? 'border-red-500' : ''}`} 
                        placeholder='Password' 
                        id='password' 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#ffffff">
                    </TextInput>

                    <Text className='text-red-500 mt-2'>{errors.password ? errors.password[0] : ''}</Text>

                </View>

                <Text className='bg-[#8CEB11] text-white text-2xl font-bold rounded-lg p-2' id='loginBtn' onPress={HandleLogin}>Login</Text>

                <View className='items-center gap-2'>
                    <Text className='text-white'>Dont have an account?</Text>
                    <Link href="register" className='text-blue-400 font-bold underline'>Register here</Link>
                </View>

            </View>
        </View>
    );
}