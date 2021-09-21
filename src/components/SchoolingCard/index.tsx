import React from 'react'

import { TouchableOpacityProps } from 'react-native'
import { Button } from '../Button';

import {
  SchoolingCardContainer,
  SchoolingCardText,
  DeleteButtonArea
} from './styles'

interface ISchoolingCardProps extends TouchableOpacityProps {
  index: number;
  id: string;
  code: number;
  schooling: string;
}

export function SchoolingCard({ index, id, code, schooling, ...props }: ISchoolingCardProps) {
  return (
    <SchoolingCardContainer 
      style={{ backgroundColor: (index % 2 === 0 ? '#c5c5c5': '#F9F5FF') }}
    >
      <SchoolingCardText>{code}</SchoolingCardText>
      <SchoolingCardText>{schooling}</SchoolingCardText>
      <DeleteButtonArea>
        <Button
          title="X"
          titleHexColor=""
          style={{ backgroundColor: 'red'}}
          {...props}
        />
      </DeleteButtonArea>
    </SchoolingCardContainer>
  );
}