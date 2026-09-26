import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius } from '../constants/theme';

interface ArcticFoxLogoProps {
  size?: number;
}

export const ArcticFoxLogo: React.FC<ArcticFoxLogoProps> = ({ size = 48 }) => {
  const iconSize = size * 0.58;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size * 0.38,
        },
      ]}
    >
      {/* Cute Arctic Fox & Snowy Frost Icon */}
      <Text style={[styles.foxEmoji, { fontSize: iconSize }]}>🦊</Text>
      <View style={styles.snowBubble}>
        <Text style={styles.snowEmoji}>❄️</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#BAE6FD',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  foxEmoji: {
    textAlign: 'center',
  },
  snowBubble: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.full,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  snowEmoji: {
    fontSize: 10,
  },
});
