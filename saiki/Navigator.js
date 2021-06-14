import React from "react";
import { View, Image, StyleSheet, TextInput, Icon, Pressable, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import Checks from './Checks';
import SHome from './Home';
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

  const Blog = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
            name="Blog"
            component={SBlog}
        />

      </Stack.Navigator>
    );
  }

  export {Blog};

  const Home = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

        <Stack.Screen
            name="Home"
            component={SHome}
        />

        <Stack.Screen
            name="Gereja"
            component={SGereja}
        />
        <Stack.Screen
            name="Anggota"
            component={SAnggota}
        />
        <Stack.Screen
            name="Info"
            component={SInfo}
        />
        <Stack.Screen
            name="Warta"
            component={SWarta}
        />
        <Stack.Screen
            name="Renungan"
            component={SRenungan}
        />
        <Stack.Screen
            name="Kedai"
            component={SKedai}
        />
        <Stack.Screen
            name="Koperasi"
            component={SKoperasi}
        />
        <Stack.Screen
            name="Laporan"
            component={SLaporan}
        />
      </Stack.Navigator>
    );
  }

  export {Home};

  const Syukur = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Syukur"
            component={SSyukur}
        />
      </Stack.Navigator>
    );
  }

  export {Syukur};
