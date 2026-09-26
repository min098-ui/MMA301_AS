import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface AxolotlLogoProps {
  size?: number;
}

export const AxolotlLogo: React.FC<AxolotlLogoProps> = ({ size = 52 }) => {
  const scale = size / 52;

  return (
    <View style={[styles.container, { width: size * 1.15, height: size }]}>
      {/* Left External Gills (Mang ngoài bên trái) */}
      <View style={[styles.gillsLeft, { transform: [{ scale }] }]}>
        <View style={[styles.gill, styles.gillTopLeft]} />
        <View style={[styles.gill, styles.gillMidLeft]} />
        <View style={[styles.gill, styles.gillBotLeft]} />
      </View>

      {/* Main Cute Pink Head (Đầu Axolotl) */}
      <View
        style={[
          styles.head,
          {
            width: size * 0.82,
            height: size * 0.76,
            borderRadius: (size * 0.82) / 2,
          },
        ]}
      >
        {/* Cute Kawaii Eyes (Mắt to tròn long lanh) */}
        <View style={styles.eyeRow}>
          <View style={[styles.eye, { width: 6.5 * scale, height: 6.5 * scale }]}>
            <View style={[styles.pupilShine, { width: 2.2 * scale, height: 2.2 * scale }]} />
          </View>
          <View style={[styles.eye, { width: 6.5 * scale, height: 6.5 * scale }]}>
            <View style={[styles.pupilShine, { width: 2.2 * scale, height: 2.2 * scale }]} />
          </View>
        </View>

        {/* Blush Cheeks & Smile (Má hồng & miệng cười đáng yêu) */}
        <View style={styles.mouthRow}>
          <View style={[styles.blush, { width: 6 * scale, height: 3.5 * scale }]} />
          <Text style={[styles.mouth, { fontSize: 8.5 * scale }]}>‿</Text>
          <View style={[styles.blush, { width: 6 * scale, height: 3.5 * scale }]} />
        </View>
      </View>

      {/* Right External Gills (Mang ngoài bên phải) */}
      <View style={[styles.gillsRight, { transform: [{ scale }] }]}>
        <View style={[styles.gill, styles.gillTopRight]} />
        <View style={[styles.gill, styles.gillMidRight]} />
        <View style={[styles.gill, styles.gillBotRight]} />
      </View>

      {/* Cute Sparkle Bubble */}
      <View style={[styles.sparkleBadge, { right: -2 * scale, top: -2 * scale }]}>
        <Text style={[styles.sparkleText, { fontSize: 9 * scale }]}>🌸</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  head: {
    backgroundColor: '#FFE4E6',
    borderWidth: 2,
    borderColor: '#FDA4AF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 2,
  },
  eyeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '56%',
    marginBottom: 2,
  },
  eye: {
    backgroundColor: '#881337',
    borderRadius: 9999,
    position: 'relative',
  },
  pupilShine: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    position: 'absolute',
    top: 1,
    left: 1,
  },
  mouthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '74%',
  },
  mouth: {
    color: '#881337',
    fontWeight: '800',
    lineHeight: 10,
    marginTop: -2,
    marginHorizontal: 3,
  },
  blush: {
    backgroundColor: '#FB7185',
    borderRadius: 9999,
    opacity: 0.75,
  },
  gillsLeft: {
    position: 'absolute',
    left: 1,
    zIndex: 1,
    gap: 3,
  },
  gillsRight: {
    position: 'absolute',
    right: 1,
    zIndex: 1,
    gap: 3,
  },
  gill: {
    backgroundColor: '#FB7185',
    borderWidth: 1,
    borderColor: '#F43F5E',
  },
  gillTopLeft: {
    width: 11,
    height: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 4,
    transform: [{ rotate: '20deg' }],
  },
  gillMidLeft: {
    width: 14,
    height: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 5,
  },
  gillBotLeft: {
    width: 10,
    height: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 10,
    transform: [{ rotate: '-20deg' }],
  },
  gillTopRight: {
    width: 11,
    height: 6,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 4,
    transform: [{ rotate: '-20deg' }],
  },
  gillMidRight: {
    width: 14,
    height: 6,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 5,
  },
  gillBotRight: {
    width: 10,
    height: 6,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 10,
    transform: [{ rotate: '20deg' }],
  },
  sparkleBadge: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#FECDD3',
    zIndex: 4,
  },
  sparkleText: {
    textAlign: 'center',
  },
});
