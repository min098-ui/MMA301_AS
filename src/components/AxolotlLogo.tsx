import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface AxolotlLogoProps {
  size?: number;
  showOnlineBadge?: boolean;
}

export const AxolotlLogo: React.FC<AxolotlLogoProps> = ({
  size = 48,
  showOnlineBadge = false,
}) => {
  const borderRadius = Math.round(size * 0.32);

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <View style={[styles.container, { width: size, height: size, borderRadius }]}>
        <Image
          source={require('../../assets/axolotl_3d.jpg')}
          style={[styles.image, { width: size, height: size, borderRadius }]}
          resizeMode="cover"
        />
      </View>
      {showOnlineBadge && <View style={styles.onlineBadge} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderColor: Colors.primarySoft,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
