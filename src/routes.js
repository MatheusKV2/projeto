import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './navigators/main';
import OnBoarding from './pages/Authentication/OnBoarding'
import Login from './pages/Authentication/Login'

const Stack = createStackNavigator();

export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}