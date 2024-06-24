import { router } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Context, { UserInfo } from '../../components/Context';
import ScreenWrapper from '../../components/ScreenWrapper';
import { fetchAndGroupUsersForTransportationScreen } from '../../firebase/util';
import { StatusScreenDetails } from './status';

const screenHeight = Dimensions.get('window').height;

const TransportationScreen: React.FC = () => {
  const { userInfo } = useContext(Context);
  const [groupedUsers, setGroupedUsers] = useState<{ [key: string]: UserInfo[] }>({});

  const handleEnterChat = useCallback(() => {
    if (!userInfo.schoolName) {
      Alert.alert('Please select a school.');
    } else if (!userInfo.volunteeringDay) {
      Alert.alert('Please select a volunteering day.');
    } else {
      router.push({
        pathname: '/(tabs)/transportation/chat',
      });
    }
  }, [userInfo.volunteeringDay, userInfo.schoolName]);

  // fetch users in real time and group them by transport status and unsubscribe in useeffect. wrap it in async function
  useEffect(() => {
    let unsubscribe;

    const fetchUsers = async () => {
      const subscription = await fetchAndGroupUsersForTransportationScreen(
        userInfo.schoolName,
        userInfo.volunteeringDay,
        (users) => {
          setGroupedUsers(users);
        }
      );
      unsubscribe = subscription.unsubscribe;
    };

    fetchUsers();

    // Cleanup function to unsubscribe
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userInfo]);

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        {groupedUsers && (
          <StatusScreenDetails day={userInfo?.volunteeringDay} groupedUsers={groupedUsers} />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEnterChat}>
          <Icon name="chat" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', // Space out elements with space between them
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    position: 'relative',
  },
  buttonContainer: {
    width: '100%', // Make the button container full width
    alignItems: 'center', // Center the button horizontally
    marginBottom: 30, // Add some padding at the bottom if necessary
  },
  button: {
    backgroundColor: '#36afbc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 70,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransportationScreen;
