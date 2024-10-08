import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Context from './Context';
import ScreenWrapper from './ScreenWrapper';
import { ResourceURLs, getResourceURLs } from '../firebase/util';
import ClockIcon from '../icons/ClockIcon';
import GroupMeIcon from '../icons/GroupMeIcon';
import MapIcon from '../icons/MapIcon';
import TipsIcon from '../icons/TipsIcon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

// Button configuration for smaller action buttons
const SMALLBUTTONS = [
  { index: 1, label: 'Mission Statement' },
  { index: 2, label: 'Morning Program' },
];

// Utility function to handle URL opening with error management
const attemptOpenURL = async (url: string, failureMessage: string): Promise<void> => {
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', failureMessage);
  }
};

// function to open Mail To link for Val
const sendEmail = () => {
  Linking.openURL('mailto:val.buchanan@northwestern.edu');
};

function HomeScreen() {
  const navigation = useNavigation<any>();
  const { userInfo } = useContext(Context);
  const [resourceURLs, setResourceURLs] = useState<ResourceURLs | null>(null);

  // Fetch resource URLs from Firebase
  useEffect(() => {
    // Define an asynchronous function inside the useEffect hook to fetch the resource URLs.
    const fetchResourceURLs = async () => {
      const urls = await getResourceURLs();
      try {
        setResourceURLs(urls);
      } catch (error) {
        // If an error occurs during fetching, log it to the console.
        console.error('Failed to fetch urls:', error);
      }
    };
    fetchResourceURLs();
  }, []);

  // Button press handler for navigation and action buttons
  const handleButtonPress = (buttonIndex: number) => {
    const actions = {
      1: () => {
        if (!userInfo.schoolName) {
          Alert.alert('Please select a school.');
        } else {
          navigation.navigate('Navigation');
        }
      },
      2: () => {
        if (resourceURLs.trackerURL) {
          attemptOpenURL(
            resourceURLs.trackerURL,
            'Sorry, it looks like the Tracker cannot be opened'
          );
        }
      },
      3: () => {
        if (!userInfo.schoolName) {
          Alert.alert('Please select a school.');
        } else {
          navigation.navigate('Tips');
        }
      },

      4: () => {
        if (resourceURLs.groupMeURL) {
          attemptOpenURL(resourceURLs.groupMeURL, 'Sorry, it looks like GroupMe cannot be opened.');
        }
      },
      5: () => navigation.navigate('Mission'),
      6: () => navigation.navigate('Morning'),
    };

    const action = actions[buttonIndex];
    if (action) {
      action();
    } else {
      console.error(`Button ${buttonIndex} pressed with no action defined.`);
    }
  };

  if (!userInfo.isRegistered) {
    return (
      <ScreenWrapper>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('UserScreening')}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>**IMPORTANT**</Text>
            <View style={styles.messageTextContainer}>
              <Text style={styles.messageText}>
                If you have not applied but are interested in volunteering, please email Val.
              </Text>
              <TouchableOpacity onPress={sendEmail}>
                <Text style={styles.emailLinkText}>SEND EMAIL HERE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subtitle}>Program Info</Text>
          <View style={styles.buttonsGrid}>
            {SMALLBUTTONS.map((button) => (
              <TouchableOpacity
                key={button.index}
                style={styles.button}
                onPress={() => handleButtonPress(4 + button.index)}>
                <Text style={styles.buttonText}>{button.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  } else {
    return (
      <ScreenWrapper>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.subtitle}>Resources</Text>
          <View style={styles.buttonsGrid}>
            <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(1)}>
              <MapIcon />
              <Text style={styles.bigButtonText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(2)}>
              <ClockIcon />
              <Text style={styles.bigButtonText}>Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(3)}>
              <TipsIcon />
              <Text style={styles.bigButtonText}>Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(4)}>
              <GroupMeIcon />
              <Text style={styles.bigButtonText}>GroupMe</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Program Info</Text>
          <View style={styles.buttonsGrid}>
            {SMALLBUTTONS.map((button) => (
              <TouchableOpacity
                key={button.index}
                style={styles.button}
                onPress={() => handleButtonPress(4 + button.index)}>
                <Text style={styles.buttonText}>{button.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const layoutConstants = {
  padding: 20,
  subtitlePaddingLeft: screenWidth * 0.11,
  buttonMargin: screenWidth / 23,
  buttonSize: screenWidth / 2.9,
  smallButtonHeight: screenHeight / 15,
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: layoutConstants.padding,
    paddingTop: 2,
    paddingBottom: 0,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36afbc',
    textAlign: 'left', // Align text to the left within the Text component
    paddingLeft: layoutConstants.subtitlePaddingLeft,
  },
  messageContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  messageTextContainer: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 100,
    alignItems: 'center',
    backgroundColor: '#36afbc',
    borderRadius: 20,
  },
  messageTitle: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F1375A',
    textAlign: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  emailLinkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    padding: 20,
  },
  bigButton: {
    margin: layoutConstants.buttonMargin,
    height: layoutConstants.buttonSize,
    width: layoutConstants.buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36afbc',
    borderRadius: 30,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#ffffff',
  },
  buttonIcon: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginBottom: 14, // Space between the icon and text
  },
  logo: {
    width: 300,
    height: 100,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 0.2,
    borderColor: '#F3F3F3',
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: '78%',
    height: screenHeight / 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 2,
  },
  buttonText: {
    color: '#36afbc',
    fontSize: 16,
  },
  bigButtonText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
