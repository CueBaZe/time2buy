import '../global.css'; 
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name='index'
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="(tabs)" 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="login"
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="register"
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="terms"
                options={{ title: 'Terms and Conditions', headerTitleAlign: 'center' }}
            />
            <Stack.Screen 
                name="about"
                options={{ title: 'About', headerTitleAlign: 'center' }}
            />
        </Stack>
    );
}