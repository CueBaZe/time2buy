import '../../global.css'; 
import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index" 
                options={{ 
                    headerShown: false, 
                    tabBarLabel: "Dashboard", 
                    tabBarIcon: ({focused, color}) => ( 
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} 
                        color={color} 
                        size={24} /> 
                    ),
                }}
            />
            <Tabs.Screen 
                name="about" 
                options=
                {{ 
                    headerShown: false, 
                    tabBarIcon: ({focused, color}) => ( 
                        <Ionicons name={focused ? "information-circle-sharp" : "information-circle-outline"} 
                        color={color} 
                        size={24} /> 
                    ),
                }} 
            />
        </Tabs>
    );
}