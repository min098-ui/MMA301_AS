import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';

interface SnowFoxLogoProps {
  size?: number;
  showOnlineBadge?: boolean;
}

export const SnowFoxLogo: React.FC<SnowFoxLogoProps> = ({
  size = 48,
  showOnlineBadge = false,
}) => {
  const borderRadius = Math.round(size * 0.32);

  // Floating & Breathing Animation using useState lazy initializer (lint-safe)
  const [translateY] = useState(() => new Animated.Value(0));
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const [tapBounceAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    // Continuous smooth floating loop (up and down)
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -4,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.03,
            duration: 1600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 3,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.98,
            duration: 1600,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    floatLoop.start();

    return () => {
      floatLoop.stop();
    };
  }, [translateY, scaleAnim]);

  const handleTap = () => {
    // Playful bounce on tap
    tapBounceAnim.setValue(0.88);
    Animated.spring(tapBounceAnim, {
      toValue: 1,
      friction: 3,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  const combinedScale = Animated.multiply(scaleAnim, tapBounceAnim);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleTap}
      style={[styles.wrapper, { width: size, height: size }]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius,
            transform: [{ translateY }, { scale: combinedScale }],
          },
        ]}
      >
        <Image
          source={require('../../assets/snow_fox_3d.jpg')}
          style={[styles.image, { width: size, height: size, borderRadius }]}
          resizeMode="cover"
        />
      </Animated.View>
      {showOnlineBadge && <View style={styles.onlineBadge} />}
    </TouchableOpacity>
  );
};

// Aliases for seamless backwards compatibility
export const AxolotlLogo = SnowFoxLogo;
export const FoxLogo = SnowFoxLogo;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#E0F2FE', // Ice Sky Blue tint
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
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
    zIndex: 10,
  },
});
