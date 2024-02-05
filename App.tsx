import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Providers} from './src/providers';
import {reportError} from './src/helpers';
import {Navigation} from './src/navigation';
import {ErrorBoundary} from './src/components/error_boundary';

if (__DEV__) {
  // Configure Reactotron in dev environment
  require('./src/config/reactotron');
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Providers>
        <ErrorBoundary onError={reportError}>
          <Navigation />
        </ErrorBoundary>
      </Providers>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
