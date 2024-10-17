import React from 'react';
import {StyleSheet} from 'react-native';
import Routes from './src/routes/Routes';
import {ModalPortal} from 'react-native-modals';
import {AuthProvider} from './AuthContext';
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
        <ModalPortal />
      </AuthProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
