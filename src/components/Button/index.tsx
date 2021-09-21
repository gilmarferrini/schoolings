import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { TouchableOpacityButton, TouchableOpacityTitle } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  titleHexColor?: string;
}

export function Button({ 
  title, 
  titleHexColor = '#000000', 
  ...rest }: IButtonProps) {
  return (
    <TouchableOpacityButton
      activeOpacity={0.8}
      {...rest}
    >
      <TouchableOpacityTitle
        style={{ color: titleHexColor }}
      >
        {title}
      </TouchableOpacityTitle>
    </TouchableOpacityButton>
  ); 
}