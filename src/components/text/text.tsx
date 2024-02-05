import React from 'react';
import {TextProps, Text as BaseText} from 'react-native';

import {makeUseStyles} from '../../helpers';

const TextComponent: React.FC<TextProps> = ({children, style, ...props}) => {
  const {styles} = useStyles();

  return (
    <BaseText
      allowFontScaling
      minimumFontScale={0.05}
      maxFontSizeMultiplier={0.05}
      style={[styles.text, style]}
      {...props}>
      {children}
    </BaseText>
  );
};

export class Text extends React.Component<TextProps> {
  constructor(props: TextProps) {
    super(props);
  }

  render() {
    return <TextComponent {...this.props} />;
  }
}

const useStyles = makeUseStyles(({palette, fonts}) => ({
  text: {
    color: palette.text,
    fontSize: fonts.size.s,
  },
}));
