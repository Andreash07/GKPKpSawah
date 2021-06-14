import React, { Component } from 'react';
import {
  View,
  Alert
} from "react-native";
import messaging from '@react-native-firebase/messaging';

const Notify = (props) => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //JSON.stringify(remoteMessage);
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    return unsubscribe;
  });

  return (
    <View isVisible={false}></View>
  );
};

export default Notify;