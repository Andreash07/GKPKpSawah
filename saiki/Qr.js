import React from 'react'
import { ScrollView, Alert, TextInput, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { setMember } from './redux/actions/authActions';
import { connect } from 'react-redux';
import Notify from './Notify';

//import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';

const width = Dimensions.get('window').width;
const swidth = Dimensions.get('window').width - 30;
const nwidth = Dimensions.get('window').width - 60;
const xwidth = Dimensions.get('window').width + 240;
const xheight = Dimensions.get('window').height + 50;

const QRCodes = (props) => {
    const [stoped, setStoped] = React.useState(true);
    const [tokens, setTokens] = React.useState('');

    React.useEffect(() => {

      if (props.dataMember != '') {
        if (props.dataMember.includes('https://sisfo-gkpkampungsawah.com/qrcode/scan/')) {
          props.navigation.navigate('Webview', { getParams: props.dataMember } );
        }
      }

      //-
      requestUserPermission();
    }, []);

    requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        getFcmToken();
        //console.log('Authorization status:', authStatus);
      }
    }

    getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
       //console.log(fcmToken);
       setTokens(fcmToken);
      } else {
        //console.log("Failed", "No token received");
      }
    }

    const onGet = (e): void => {
      //console.log(e.data);
      if (e.data.includes('https://sisfo-gkpkampungsawah.com/qrcode/scan/')) { 
        props.setMember(e.data);

        props.navigation.navigate('Webview', { getParams: e.data+'?device_id='+tokens } );
        
        /*
        props.navigation.reset({
          index: 0, 
          routes: [{ 
            name: 'Webview', 
            params: { getParams: e.data+'?device_id='+tokens } 
          }] 
        });
        */
        
      } else {
        //setStoped(true);
        Alert.alert(
          "Peringatan",
          "QR Code Tidak dikenali",
          [
            //{ text: "OK", onPress: () => setStoped(true) }
            { text: "OK" }
          ]
        );
      }
    }
    return (
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <Notify/>
        <View>
            <Image style={{ height: xheight, width: xwidth, position: 'absolute', top:0, left:0 }} source={require('./assets/bg.jpg')} />
        </View>
        <ScrollView style={{ flex:1, }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

          <View style={ styles.btnForm }>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={styles.iconLogin} activeOpacity={0.5}>
              <Image
                source={require('./assets/icon-idpengguna.png')}
                style={styles.ImageIconStyle}
              />
              <Text style={styles.TextStyle}> ID Pengguna</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Qr')} style={styles.iconQr} activeOpacity={0.5}>
              <Image
                source={require('./assets/icon-qrcode.png')}
                style={styles.ImageIconStyle}
              />
              <Text style={styles.TextStyle}> Scan QRcode</Text>
            </TouchableOpacity>
          </View>

          <View style={ styles.loginForm }>
            <QRCodeScanner cameraStyle={{height: 200, width: swidth - 2}}
            cameraTimeout={0}
            reactivate={stoped}
            //containerStyle={{height:200}}
            cameraProps={{ ratio:'1:1' }} 
            onRead={onGet}
            reactivateTimeout={2000}
            />
          </View>

        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QRCodes);

const styles = StyleSheet.create({
  qrScan: {
    width:200,
    height:200
  },

  containers: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    width: xwidth,
    height: xheight,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  // btn form
  btnForm: {
    flexDirection: 'row',
    //justifyContent: 'center',
    width: swidth,
    //backgroundColor: 'red',
    marginLeft: 15,
    justifyContent: 'space-between'

  },
  iconLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#470793',
    borderWidth: 0.5,
    borderColor: '#470793',
    height: 40,
    borderRadius: 5,
    width: swidth / 2 - 8,
  },
  iconQr: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5294B',
    borderWidth: 0.5,
    borderColor: '#E5294B',
    height: 40,
    borderRadius: 5,
    width: swidth / 2 - 8,
  },
  ImageIconStyle: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginLeft: 8,
    marginTop: -2
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 5,
  },
  //-- login form
  loginForm: {
    marginTop:40,
    marginLeft: 15,
    width: swidth,
    height: 330,
  },
  inputContainer: {
    borderBottomColor: '#470793',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 2,
    width:nwidth,
    height:40,
    marginTop:40,
  },
  inputs:{
    height:40,
    marginLeft:15,
    flex:1,
  },
  mLogin: {
    marginTop:30,
    //flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#470793',
    borderWidth: 0.5,
    borderColor: '#470793',
    height: 40,
    borderRadius: 5,
    width: nwidth,
  },
  mText: {
    color: '#fff',
    fontSize: 18,
    paddingTop:6
  },

})