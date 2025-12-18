// utils/keyboardHelper.js
// Capacitor Keyboard Plugin configuration helper
// Add this utility to handle keyboard behavior in your app

import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

/**
 * Initialize keyboard settings for optimal chat experience
 * Call this in your App.jsx or main component
 */
export const initializeKeyboardSettings = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Configure keyboard to not hide on scroll
      await Keyboard.setAccessoryBarVisible({ isVisible: true });
      
      // Configure resize mode - this is crucial for chat apps
      await Keyboard.setResizeMode({ mode: 'native' });
      
      // Optionally set scroll assist mode
      await Keyboard.setScroll({ isDisabled: false });
      
      console.log('Keyboard settings initialized');
    } catch (error) {
      console.error('Error initializing keyboard settings:', error);
    }
  }
};

/**
 * Setup keyboard event listeners for chat view
 * Returns cleanup function
 */
export const setupKeyboardListeners = (onKeyboardShow, onKeyboardHide) => {
  if (!Capacitor.isNativePlatform()) {
    return () => {}; // No cleanup needed for web
  }

  const showListener = Keyboard.addListener('keyboardWillShow', (info) => {
    if (onKeyboardShow) {
      onKeyboardShow(info.keyboardHeight);
    }
  });

  const hideListener = Keyboard.addListener('keyboardWillHide', () => {
    if (onKeyboardHide) {
      onKeyboardHide();
    }
  });

  // Return cleanup function
  return () => {
    showListener.remove();
    hideListener.remove();
  };
};

/**
 * Keep keyboard open after sending a message
 */
export const keepKeyboardOpen = async (inputRef) => {
  if (!Capacitor.isNativePlatform()) {
    // Web fallback - just maintain focus
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    return;
  }

  try {
    // For native platforms, ensure keyboard stays visible
    if (inputRef?.current) {
      inputRef.current.focus();
      
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(0, 0);
        }
      });
    }
  } catch (error) {
    console.error('Error keeping keyboard open:', error);
  }
};

/**
 * Hide keyboard programmatically if needed
 */
export const hideKeyboard = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await Keyboard.hide();
    } catch (error) {
      console.error('Error hiding keyboard:', error);
    }
  }
};

export default {
  initializeKeyboardSettings,
  setupKeyboardListeners,
  keepKeyboardOpen,
  hideKeyboard,
};