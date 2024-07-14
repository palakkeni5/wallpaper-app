import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FullImage} from "./FullImage";
import {HomeScreen} from "./Home";
import {ImageLists} from "./ImageLists";

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
	        initialRouteName={'HomeScreen'}
          screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
       >

        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{
            headerShown:false
          }}
          />

        <Stack.Screen 
          name="ImageLists" 
          component={ImageLists} 
          options={{
            headerShown:false,
          }}
          />

        <Stack.Screen 
          name="FullImage" 
          component={FullImage} 
          options={{
            headerShown:false,
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}