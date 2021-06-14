import React from 'react'
import { ScrollView, Alert, TextInput, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import axios from 'axios';

import { setMember } from './redux/actions/authActions';
import Notify from './Notify';
import { connect } from 'react-redux';

//import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';

const width = Dimensions.get('window').width;
const swidth = Dimensions.get('window').width - 30;
const nwidth = Dimensions.get('window').width - 60;
const xwidth = Dimensions.get('window').width + 240;
const xheight = Dimensions.get('window').height + 50;

const Auth = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
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

      }
    }

    const onSubmit = (): void => {
      //--
      const data = new FormData();
      data.append('username', username);
      data.append('password', password);
      axios.post('https://sisfo-gkpkampungsawah.com/login/authAPI_user_keluarga', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {

        if (response.data.status === 1) {
          props.setMember(response.data.url);

          props.navigation.navigate('Webview', { getParams: response.data.url+'?device_id='+tokens } );

          /*
          props.navigation.reset({
            index: 0, 
            routes: [{ 
              name: 'Webview', 
              params: { getParams: response.data.url+'?device_id='+tokens } 
            }] 
          });
          */

        } else {
          Alert.alert(
            "Proses Login Gagal!",
            "ID Penggunan dan Kata Sandi tidak cocok",
            [{ text: "OK" }]
          );
        }

      })
      .catch(error => {
        Alert.alert(
          "Terjadi kesalahan",
          "Silahkan coba beberapa saat lagi",
          [{ text: "OK" }]
        );
      });
      //--
    }

    return (
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <Notify/>
        <View>
            <Image style={{ height: xheight, width: xwidth, position: 'absolute', top:0, left:0 }} source={require('./assets/bg.jpg')} />
        </View>
        <ScrollView style={{ flex:1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

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

            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                  placeholder="ID Keluarga Jemaat"
                  placeholderTextColor="#470793"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => setUsername(email) }
                  />
            </View>

            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Kata Sandi"
                placeholderTextColor="#470793"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => setPassword(password) }
                />
            </View>


            <TouchableOpacity onPress={()=> { onSubmit() }} style={styles.mLogin} activeOpacity={0.5}>
                <Text style={styles.mText}> Masuk</Text>
            </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const styles = StyleSheet.create({
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
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    width: swidth,
    height: 330,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
    marginTop:40,
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