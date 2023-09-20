import AsyncStorage from '@react-native-async-storage/async-storage';

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  return !!token;
};