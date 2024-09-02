import { useNavigation } from 'expo-router';
import { push, ref, serverTimestamp } from 'firebase/database';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';

import Context from '../../components/Context';
import { database } from '../../firebase/firebaseConfig';
import { listenToChatMessages } from '../../firebase/util';

const ChatScreen = () => {
  // State to store chat messages
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { userInfo } = useContext(Context);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${userInfo.volunteeringDay}` });
  }, [navigation]);

  useEffect(() => {
    if (userInfo.schoolName && userInfo.volunteeringDay) {
      const unsubscribe = listenToChatMessages(
        userInfo.schoolName,
        userInfo.volunteeringDay,
        (messages) => {
          setMessages(messages);
        }
      );

      return () => unsubscribe();
    }
  }, [userInfo.schoolName, userInfo.volunteeringDay]);

  // Function to handle sending new messages
  const onSend = useCallback(
    (newMessages = []) => {
      const messagesRef = ref(database, `chat/${userInfo.schoolName}/${userInfo.volunteeringDay}`); // Reference to the messages node in Firebase

      newMessages.forEach((message) => {
        const messageData = {
          text: message.text, // Message text
          createdAt: serverTimestamp(), // Server timestamp for message creation
          user: message.user, // User who sent the message
        };
        push(messagesRef, messageData); // Push the new message to Firebase
      });

      // Append the new messages to the existing messages
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    },
    [userInfo.schoolName, userInfo.volunteeringDay]
  );

  const renderBubble = useCallback(
    (props) => (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: '#36afbc',
          },
        }}
        textStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        }}
      />
    ),
    []
  );

  return (
    <>
      {(!userInfo.schoolName || !userInfo.volunteeringDay) && (
        <View>
          <Text>Please select a school to view the chat.</Text>
        </View>
      )}
      {userInfo.schoolName && userInfo.volunteeringDay && (
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
          <GiftedChat
            messages={messages} // Messages to be displayed in the chat
            onSend={(messages) => onSend(messages)} // Function to call when sending messages
            user={{
              _id: userInfo.id,
              name: userInfo.name,
            }}
            placeholder="Message"
            renderBubble={renderBubble}
            listViewProps={{ keyboardDismissMode: 'on-drag' }}
            keyboardShouldPersistTaps="never"
          />
        </View>
      )}
    </>
  );
};

export default ChatScreen;
