// Avatar.tsx
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';

interface CustomAvatarProps {
  currentMessage?: IMessage;
}

const Avatar: React.FC<CustomAvatarProps> = ({ currentMessage }) => {
  const avatarUri = currentMessage?.user?.avatar;

  if (avatarUri) {
    return (
      <View>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Avatar;
