import React, { useState, useEffect } from 'react';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import { Text, View, Image, StyleSheet, TextInput, Icon, Pressable, Button } from 'react-native';

import { Blog, Home, Syukur } from './Navigator'

import Checks from './Checks';
import Login from './Login';
import Qr from './Qr';
import Webview from './Webview';
import Browser from './Browser';

import SGereja from './PGereja';
import SBlog from './PBlog';
import SSyukur from './PSyukur';
import SAnggota from './PAnggota';
import SInfo from './PInfo';
import SWarta from './PWarta';
import SRenungan from './PRenungan';
import SKedai from './PKedai';
import SKoperasi from './PKoperasi';
import SLaporan from './PLaporan';
import Screen from './Dummy';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BrowserTabs = () => {
  return (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor: '#ffffff',
            showLabel: false,
            style: {
              backgroundColor: '#5603ad',
              paddingBottom:0,
              elevation: 0,
              shadowOpacity: 0,
            }
          }}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Blog"
            component={Blog}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                source={require('./assets/1a.png')}
                style={{width: 42, height: 42, tintColor: color}}
              />
              ),
              tabBarVisible: true
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                source={require('./assets/2a.png')}
                style={{width: 42, height: 42, tintColor: color}}
              />
              ),
              tabBarVisible: false
            }}

            listeners={({ navigation, route }) => ({
              tabPress: e => {
                //e.preventDefault();
                navigation.navigate('Home');
              },
            })}

          />
          <Tab.Screen
            name="Syukur"
            component={Syukur}
            options={({ route }) => ({
            //options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                source={require('./assets/3a.png')}
                style={{width: 42, height: 42, tintColor: color}}
              />
              ),
              tabBarVisible: true
            })}
          />

        </Tab.Navigator>
  );
}


const App: () => Saiki = (props: mapStateToProps) => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={BrowserTabs} />

          <Stack.Screen name="Checks" component={Checks} />
          <Stack.Screen name="Webview" component={Webview} />
          
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Qr" component={Qr} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;