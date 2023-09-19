import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlashMessage = ({ message, type, onHide }) => {
  let messageStyle = {};

  switch (type) {
    case 'success':
      messageStyle = styles.successMessage;
      break;
    case 'alert':
      messageStyle = styles.alertMessage;
      break;
    case 'error':
      messageStyle = styles.errorMessage;
      break;
    default:
      messageStyle = styles.defaultMessage;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 3000); // Ocultar el mensaje después de 3 segundos (ajusta el tiempo según tus necesidades)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={[styles.container, messageStyle]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: 'green',
  },
  alertMessage: {
    backgroundColor: 'yellow',
  },
  errorMessage: {
    backgroundColor: 'red',
  },
  defaultMessage: {
    backgroundColor: 'gray',
  },
});

export default FlashMessage;