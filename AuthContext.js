import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState('');
  const isLoggedIn = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('token');
      setToken(userToken);
      setLoading(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, [token]);
  return (
    <AuthContext.Provider value={{token, setToken, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext,AuthProvider}