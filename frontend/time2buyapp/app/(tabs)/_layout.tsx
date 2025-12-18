import '../../global.css'; 
import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{tabBarStyle: {backgroundColor: '#ecececff'} ,tabBarActiveTintColor: "#8ceb11ff", tabBarInactiveTintColor: '#bebebeff' }}>
            <Tabs.Screen 
                name="dashboard" 
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
                name="item" 
                options=
                {{ 
                    headerShown: false, 
                    tabBarLabel: () => null, 
                    tabBarIcon: ({focused}) => ( 
                        <View className={`
                            w-20 h-20 rounded-full items-center justify-center -mt-8 border border-4 border-[#ecececff]
                            ${focused ? 'bg-[#8ceb11ff]' : 'bg-[#bebebeff]'}
                        `}>
                            <Ionicons name={focused ? "add-sharp" : "add-outline"} 
                            color={'#fff'}
                            size={40} /> 
                        </View>
                    ),
                }} 
            />
            <Tabs.Screen 
                name="settings" 
                options=
                {{ 
                    headerShown: false, 
                    tabBarIcon: ({focused, color}) => ( 
                        <Ionicons name={focused ? "settings-sharp" : "settings-outline"} 
                        color={color} 
                        size={24} /> 
                    ),
                }} 
            />
        </Tabs>
    );
}