import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../themes/theme';

import { NavigationContainer } from '@react-navigation/native';
import BasicInfoScreen from '../screens/StackScreens/BasicInfoScreen';
import BirthScreen from '../screens/StackScreens/BirthScreen';
import DatingTypeScreen from '../screens/StackScreens/DatingTypeScreen';
import EmailScreen from '../screens/StackScreens/EmailScreen';
import GenderScreen from '../screens/StackScreens/GenderScreen';
import HomeTownScreen from '../screens/StackScreens/HomeTownScreen';
import LocationScreen from '../screens/StackScreens/LocationScreen';
import LookingForScreen from '../screens/StackScreens/LookingForScreen';
import NameScreen from '../screens/StackScreens/NameScreen';
import PasswordScreen from '../screens/StackScreens/PasswordScreen';
import PhotoScreen from '../screens/StackScreens/PhotoScreen';
import PreFinalScreen from '../screens/StackScreens/PreFinalScreen';
import PromptsScreen from '../screens/StackScreens/PromptsScreen';
import ShowPromptsScreen from '../screens/StackScreens/ShowPromptsScreen';
import TypesScreen from '../screens/StackScreens/TypesScreen';
import ChatScreen from '../screens/TabScreens/ChatScreen';
import HomeScreen from '../screens/TabScreens/HomeScreen';
import LikesScreen from '../screens/TabScreens/LikesScreen';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';
import TestScreenx from '../screens/StackScreens/TestScreenx';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const AuthStack = () => {
    return (
      <>
        <Stack.Navigator  initialRouteName='Basic' screenOptions={{headerShown:false,animation:'slide_from_right'}}>
          <Stack.Screen name="Basic" component={BasicInfoScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="Email" component={EmailScreen} />
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen name="Birth" component={BirthScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="Type" component={TypesScreen} />
          <Stack.Screen name="Dating" component={DatingTypeScreen} />
          <Stack.Screen name="LookingFor" component={LookingForScreen} />
          <Stack.Screen name="Hometown" component={HomeTownScreen} />
          <Stack.Screen name="Photos" component={PhotoScreen} />
          <Stack.Screen name="Prompts" component={PromptsScreen} />
          <Stack.Screen name="ShowPrompts" component={ShowPromptsScreen} />
          <Stack.Screen name="PreFinal" component={PreFinalScreen} />
          <Stack.Screen name="Test" component={TestScreenx} />

        </Stack.Navigator>
      </>
    );
  };
  function MainStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    );
  }
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: {backgroundColor: theme.primary},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons
                  name="alpha"
                  size={25}
                  color={theme.activeColor}
                />
              ) : (
                <MaterialCommunityIcons
                  name="alpha"
                  size={25}
                  color={theme.inactiveColor}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarStyle: {backgroundColor: theme.primary},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="heart" size={25} color={theme.activeColor} />
              ) : (
                <Entypo name="heart" size={25} color={theme.inactiveColor} />
              ),
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarStyle: {backgroundColor: theme.primary},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={25}
                  color={theme.activeColor}
                />
              ) : (
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={25}
                  color={theme.inactiveColor}
                />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: {backgroundColor: theme.primary},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={theme.activeColor}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={theme.inactiveColor}
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </>
  );
};

export default Routes;

const styles = StyleSheet.create({});
