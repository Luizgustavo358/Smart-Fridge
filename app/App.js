import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes/routes';

export default function App() {
  return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#3039E1" />
        <Routes />
      </>
  );
}
