import React from 'react'
import { View } from 'react-native'

import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

const Checks = (props) => {
    React.useEffect(() => {
      //SplashScreen.show();
      if (props.dataMember != '') {
        if (props.dataMember.includes('https://sisfo-gkpkampungsawah.com/qrcode/scan/')) {

          props.navigation.navigate('Webview', { getParams: props.dataMember } );

        } else {
          props.navigation.navigate('Login');

        }
      } else {
        props.navigation.navigate('Login');
      }
    });

    return (
      <View></View>
    )
}

const mapStateToProps = (state) => {
  return {
    dataMember: state.authReducer.dataMember,
  };
};

export default connect(mapStateToProps)(Checks);