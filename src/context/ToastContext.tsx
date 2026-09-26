import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Radius } from '../constants/theme';

export type ToastType = 'success' | 'delete' | 'info' | 'error';

interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [toastData, setToastData] = useState<ToastOptions | null>(null);

  // Animated values using useState lazy initializers (React lint-safe)
  const [translateY] = useState(() => new Animated.Value(-120));
  const [opacity] = useState(() => new Animated.Value(0));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastData(null);
    });
  };

  const showToast = (options: ToastOptions | string, type: ToastType = 'success') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const data: ToastOptions =
      typeof options === 'string'
        ? { message: options, type }
        : { type: options.type || type, ...options };

    setToastData(data);

    translateY.setValue(-120);
    opacity.setValue(0);

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after 3 seconds
    timerRef.current = setTimeout(() => {
      hideToast();
    }, 3000);
  };

  const getToastStyle = (type: ToastType = 'success') => {
    switch (type) {
      case 'delete':
        return {
          icon: 'trash' as const,
          color: '#EF4444',
          bg: '#FEF2F2',
          border: '#FECDD3',
          defaultTitle: 'Đã xóa',
        };
      case 'info':
        return {
          icon: 'create-outline' as const,
          color: '#0284C7',
          bg: '#E0F2FE',
          border: '#BAE6FD',
          defaultTitle: 'Cập nhật',
        };
      case 'error':
        return {
          icon: 'alert-circle' as const,
          color: '#DC2626',
          bg: '#FEF2F2',
          border: '#F87171',
          defaultTitle: 'Lỗi',
        };
      case 'success':
      default:
        return {
          icon: 'checkmark-circle' as const,
          color: '#059669',
          bg: '#ECFDF5',
          border: '#A7F3D0',
          defaultTitle: 'Thành công',
        };
    }
  };

  const currentStyle = getToastStyle(toastData?.type);
  const topPosition = Math.max(insets.top, 14);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastData && (
        <Animated.View
          style={[
            styles.toastWrapper,
            {
              top: topPosition,
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={hideToast}
            style={[
              styles.toastContainer,
              {
                backgroundColor: '#FFFFFF',
                borderColor: currentStyle.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: currentStyle.bg, borderColor: currentStyle.border },
              ]}
            >
              <Ionicons name={currentStyle.icon} size={20} color={currentStyle.color} />
            </View>

            <View style={styles.textBox}>
              {toastData.title ? (
                <Text style={[styles.title, { color: currentStyle.color }]}>
                  {toastData.title}
                </Text>
              ) : null}
              <Text style={styles.message} numberOfLines={2}>
                {toastData.message}
              </Text>
            </View>

            <TouchableOpacity onPress={hideToast} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 99999,
    alignItems: 'center',
    elevation: 10,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 18,
  },
  closeBtn: {
    padding: 6,
    marginLeft: 6,
  },
});
