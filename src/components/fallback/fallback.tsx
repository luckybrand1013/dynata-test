import React from 'react';
import {View, Modal, SafeAreaView, TouchableOpacity} from 'react-native';

import {Text} from '../text';
import {makeUseStyles, reportError} from '../../helpers';
import {FallbackComponentProps} from '../../types/global';

type FallbackScreenProps = FallbackComponentProps & {
  title?: string;
  subtitle?: string;
  isVisible?: boolean;
  buttonText?: string;
};

const FallbackScreenComponent: React.FC<FallbackScreenProps> = ({
  error,
  resetError,
  isVisible = false,
  buttonText = 'Try again',
  title = 'Oops, Something Went Wrong.',
  subtitle = 'The app ran into a problem and could not continue. \nWe apologize for any inconvenience this has caused! \nPress the button below to restart the app. \nPlease contact us if this issue persists.',
}) => {
  const {styles} = useStyles();

  const handleClearError = () => {
    if (error) {
      reportError(error);
    }
    resetError();
  };

  const Contents = (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.title, styles.subtitle]}>{subtitle}</Text>

        <TouchableOpacity style={styles.button} onPress={handleClearError}>
          <Text style={[styles.title, styles.text]}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <Modal animationType="slide" visible={isVisible}>
      {Contents}
    </Modal>
  );
};

const useStyles = makeUseStyles(({fonts, palette, layout, hexToRGB}) => ({
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: layout.gutter,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    color: palette.text,
    fontSize: fonts.size.lg,
    marginTop: layout.gutter * 2,
  },
  subtitle: {
    opacity: 0.7,
    fontWeight: '400',
    paddingHorizontal: 10,
    fontSize: fonts.size.md,
    marginTop: layout.gutter,
    marginVertical: layout.gutter,
  },
  button: {
    height: 50,
    minWidth: 300,
    borderWidth: 1,
    marginVertical: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radius / 2,
    borderColor: hexToRGB(palette.text, 0.2),
  },
  text: {
    marginTop: 0,
    fontSize: fonts.size.default,
  },
}));

export const FallbackScreen = React.memo(FallbackScreenComponent);
