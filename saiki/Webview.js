import React from 'react'
import { TextInput, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview';

import { setMember } from './redux/actions/authActions';
import { connect } from 'react-redux';
import Notify from './Notify';

const xwidth = Dimensions.get('window').width + 240;
const swidth = 330;
const nwidth = Dimensions.get('window').width - 120;
const xheight = Dimensions.get('window').height + 50;

const WebViews = (props) => {
    const { getParams } = props.route.params;
    
    const onGet = (e): void => {
      //console.log(e.url);
      if (e.url === 'https://sisfo-gkpkampungsawah.com/login/keluarga') {
        props.setMember('');
        props.navigation.navigate('Home');
      }
    }

    return (
      <>
      <Notify/>
      <WebView
      onNavigationStateChange={onGet}
      source={{ uri: getParams }} />
      </>
    )
}

const mapStateToProps = (state) => {
  return {
    dataMember: state.authReducer.dataMember,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setMember:(payload) => dispatch(setMember(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebViews);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },


})