import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface AxolotlLogoProps {
  size?: number;
}

export const AxolotlLogo: React.FC<AxolotlLogoProps> = ({ size = 52 }) => {
  const borderRadius = size * 0.35;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius }]}>
      <Image
        source={require('../../assets/axolotl_3d.jpg')}
        style={[styles.image, { width: size, height: size, borderRadius }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE4E6',
    borderWidth: 2,
    borderColor: '#FDA4AF',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
