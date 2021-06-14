import React from 'react'
import { ScrollView, Alert, Linking, TextInput, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import axios from 'axios';

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
    const [status, setStatus] = React.useState(0);
    const [urls, setUrls] = React.useState('https://youtube.com/c/GKPKampungSawah');

    React.useEffect(() => {
      axios.get('https://sisfo-gkpkampungsawah.com/api/yt_live_streaming?api_key=9e4a3591ca3e5aebd2c05274d761e6a3', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        
        if (response.data.status == 1) {
          setStatus(1);
          setUrls(response.data.url);
        }

      })
      .catch(error => {
        console.log('err');
      });

      const parent = props.navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false
      });
      return () => parent.setOptions({ tabBarVisible: false });

      requestUserPermission();





    }, []);

    requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        getFcmToken();
      }
    }

    getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
       setTokens(fcmToken);
      }
    }

    const onGet = (e): void => {
      //console.log(e.data);
      if (e.data.includes('https://sisfo-gkpkampungsawah.com/qrcode/scan/')) { 
        props.setMember(e.data);

        props.navigation.reset({
          index: 0, 
          routes: [{ 
            name: 'Webview', 
            params: { getParams: e.data+'?device_id='+tokens } 
          }] 
        });
        
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

    const onStatus = (): void => {
      //--

      //--
    }

    return (
      <View style={{ flex:1, backgroundColor: 'transparent' }}>
        <Notify/>
        <View>
            <Image style={{ height: xheight, width: xwidth, position: 'absolute', top:0, left:0 }} source={require('./assets/bg.jpg')} />
        </View>
        <ScrollView style={{ flex:1, fontFamily: "ProductSans-Black" }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

          <View style={ styles.btnForm }>
            <Text style={ styles.formText }>
            GKP
            </Text>
            <Text style={ styles.formText }>
            Kampung Sawah
            </Text>
          </View>

          <View style={ styles.loginForm }>

            <View style={styles.menuWrap}>
              <View style={styles.menuContainer}>

                <View>
                  <TouchableOpacity style={styles.menuItem} key={1} onPress={() => props.navigation.navigate('Gereja') }>
                    <Image source={require('./assets/1.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Informasi Gereja</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={4} onPress={() => props.navigation.navigate('Warta') }>
                    <Image source={require('./assets/4.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Warta Jemaat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={7} onPress={() => props.navigation.navigate('Kedai') }>
                    <Image source={require('./assets/7.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Kedai Kite</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={styles.menuItem} key={2} onPress={() => props.navigation.navigate('Login') }>
                    <Image source={require('./assets/2.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Anggota Jemaat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={5} onPress={() => props.navigation.navigate('Renungan') }>
                    <Image source={require('./assets/5.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Renungan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={8} onPress={() => props.navigation.navigate('Koperasi') }>
                    <Image source={require('./assets/8.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Koperasi Tabur Berkat</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={styles.menuItem} key={3} onPress={() => props.navigation.navigate('Info') }>
                    <Image source={require('./assets/3.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Info Kegiatan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={6} onPress={() => props.navigation.navigate('Syukur') }>
                    <Image source={require('./assets/6.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Persembahan Syukur</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} key={9} onPress={() => props.navigation.navigate('Laporan') }>
                    <Image source={require('./assets/9.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Laporan Keuangan</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </View>


         <View style={ styles.btnForms }>
            <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com/c/GKPKampungSawah') } style={styles.iconLogin} activeOpacity={0.5}>
                <Image
                 source={require('./assets/yt1.png')}
                 style={styles.ImageIconStyle}
                />
                <Text style={styles.TextStyle}> GKP Kampung Sawah</Text>
            </TouchableOpacity>

            {status == 1 ? (
              <>
            <TouchableOpacity onPress={() => Linking.openURL(urls) } style={styles.iconQr} activeOpacity={0.5}>
                <Image
                 source={require('./assets/yt2.png')}
                 style={styles.ImageIconStyle}
                />
                <Text style={styles.TextStyle}> Live Streaming</Text>
            </TouchableOpacity>
            </>
            ) : null
          }

          </View>
            <Text style={{textAlign:'center', color: '#ffffff', marginTop:25, fontSize:15}}>
            v0.99
            </Text>
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
  menuWrap: {
    //flex: 1,
    //marginBottom:100,
    justifyContent: 'center',
    alignItems: 'center',
    //flex:1,
    width:width,
    minHeight:250,
    marginTop: 40,
    marginBottom: 30,
    fontFamily: "ProductSans-Black",
    //marginHorizontal: 5,
    //backgroundColor: "#ffffff"
  },
  menuContainer: {
    flexDirection: 'row'
  },
  menuItem: {
    width: width *0.25,
    height: width *0.25,
    marginVertical: 10,
    marginHorizontal:10,
    //backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    maxWidth:43,
    maxHeight:43,
  },
  menuText: {
    fontSize:13,
    color:'#ffffff',
    marginTop:2,
    textAlign: 'center',
    height: 50,
     fontFamily: "ProductSans-Black"
  },
  formText: {
    textAlign: 'center',
    fontSize: 37,
    color:'#ffffff',
    fontWeight: 'bold',
     fontFamily: "ProductSans-Black"
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
    width: swidth,
    marginLeft: 15,
    textAlign: 'center',
    marginTop: 50
  },
  btnForms: {
    flexDirection: 'row',
    //justifyContent: 'center',
    width: swidth,
    //backgroundColor: 'red',
    marginLeft: 15,
    marginTop:20,
    justifyContent: 'space-between'

  },
  iconLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    width: 180,
  },
  iconQr: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    width: 135,
  },
  ImageIconStyle: {
    height: 25,
    width: 30,
    resizeMode: 'stretch',
    marginTop: -2
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 5,
    textDecorationLine: 'underline'
  },
  //-- login form
  loginForm: {
    marginTop:40,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    width: swidth,
    minHeight: 340,
    borderRadius: 5,
    alignItems: 'center',
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