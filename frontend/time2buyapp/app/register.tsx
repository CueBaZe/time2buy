import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Register() {

    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const [generalError, setGenerealError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const HandleRegister = async () =>  {

        setErrors({});
        setGenerealError('');
        setSuccess('');

        if(isChecked !== true) {
            setGenerealError('Please accept the terms and conditions.');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:8000/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    passwordconfirm: confirm
                }),
            });

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

            setSuccess('User created successfully');
            setName('');
            setEmail('');
            setPassword('');
            setConfirm('');
            setChecked(false);

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

            <View className={`mt-[50px] border bg-[#282829] p-2 rounded-2xl ${(generalError || success)  ? '' : 'invisible'}`} id='infomationbox'>
                {generalError && (
                    <Text id='ErrorText' className={`text-white text-md`}><Ionicons name="information-circle" size={18} color="red" />{generalError ? generalError : ''}</Text>
                )}

                {success && (
                    <Text id='SuccessText' className={`text-white text-md ${success ? '' : 'invisible'}`}><Ionicons name="checkmark-circle" size={18} color="green" />{success ? success : ''}</Text>
                )}

            </View>

            <View className='flex-1 items-center  justify-center gap-[30px]'>
                <View className='items-center'>
                    <TextInput className={`text-white bg-[#282829] text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                        placeholder='Username' 
                        id='name'
                        value={name}
                        onChangeText={setName} 
                        placeholderTextColor="#ffffff">
                    </TextInput>
                        
                    <Text className='text-red-500 mt-2'>{errors.name ? errors.name[0] : ''}</Text>

                </View>
                
                <View className='items-center'>
                    <TextInput className={`text-white bg-[#282829] text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.email ? 'border-red-500' : ''}`} 
                        placeholder='Email' 
                        id='email' 
                        value={email}
                        onChangeText={setEmail} 
                        placeholderTextColor="#ffffff">
                    </TextInput>

                    <Text className='text-red-500 mt-2'>{errors.email ? errors.email[0] : ''}</Text>

                </View>

                <View className='items-center'>
                    <TextInput className={`text-white bg-[#282829] text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.password ? 'border-red-500' : ''}`} 
                        placeholder='Password' 
                        id='password' 
                        value={password}
                        onChangeText={setPassword} 
                        secureTextEntry
                        placeholderTextColor="#ffffff">
                    </TextInput>

                    <Text className='text-red-500 mt-2'>{errors.password ? errors.password[0] : ''}</Text>
                </View>
                
                <View className='items-center'>
                    <TextInput className={`text-white bg-[#282829] text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg ${errors.passwordconfirm ? 'border-red-500' : ''}`} 
                        placeholder='Repeat password' 
                        id='passwordconfirm' 
                        value={confirm}
                        onChangeText={setConfirm} 
                        secureTextEntry
                        placeholderTextColor="#ffffff">
                    </TextInput>

                    <Text className='text-red-500 mt-2'>{errors.passwordconfirm ? errors.passwordconfirm[0] : ''}</Text>
                </View>

                <View className='flex-2 flex-row gap-3'>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text className='text-white'>Accept <Link href={'terms'} className='underline'>Terms and Conditions</Link></Text>
                </View>

                <Text className='bg-[#8CEB11] text-white text-2xl font-bold rounded-lg p-2' id='loginBtn' onPress={HandleRegister}>Register</Text>

                <View className='items-center gap-2'>
                    <Text className='text-white'>have an account?</Text>
                    <Link href="login" className='text-blue-400 font-bold underline'>Login here</Link>
                </View>

            </View>
        </View>
    );
}