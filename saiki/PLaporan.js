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

    const [tokens, setTokens] = React.useState('');
    
    const getTokens = s => s.includes('/') && s.substr(s.lastIndexOf('/') + 1).split(' ')[0];

    React.useEffect(() => {
      if (props.dataMember != '') {
        setTokens(getTokens(props.dataMember));
      }
    }, []);

    return (
      <>
      <Notify/>
      <WebView
      source={{ uri: 'https://gkpkampungsawah.org/archive/laporan-keuangan?token='+tokens }} />
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