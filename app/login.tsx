import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Context from './components/Context';
import { getUserInfo, isNewUser } from './firebase/util';

// WebBrowser.maybeCompleteAuthSession();

GoogleSignin.configure();

export default function LoginScreen() {
  const { setUserInfo } = useContext(Context);
  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.user.email.endsWith('northwestern.edu')) {
        if (await isNewUser(userInfo.user)) {
          setUserInfo(userInfo.user);
          router.replace('/components/customization');
        } else {
          const user = await getUserInfo(userInfo.user);
          setUserInfo(user);
          router.replace('/');
        }
      } else {
        alert('Please use a Northwestern email to sign in.');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/logo.png')} style={styles.bbLogo} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Image source={require('../assets/google.png')} style={styles.googleLogo} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.disclaimer}>
          Disclaimer: Books and Breakfast is a nonprofit education volunteering program based in
          Evanston, IL. This app is intended exclusively for Northwestern University student
          volunteers participating in the program.
        </Text>
        <Text style={styles.disclaimer}>Please use your Northwestern email to sign in.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 0,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    paddingLeft: 10,
    fontSize: 16,
  },
  bbLogo: {
    width: 300,
    height: 100,
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  disclaimer: {
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingTop: 20,
    color: 'gray',
    fontSize: 14,
    paddingBottom: 10,
  },
});
