import React, {Fragment, PropsWithChildren} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '../../hooks';

export const StatusBarProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {isDarkMode} = useTheme();

  return (
    <Fragment>
      <StatusBar
        animated
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {children}
    </Fragment>
  );
};
