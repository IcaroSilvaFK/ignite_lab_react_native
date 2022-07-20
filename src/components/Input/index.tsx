import React from 'react';
import { Input as NativeInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeInput
      bg='gray.700'
      h={14}
      size='md'
      borderWidth={0}
      fontSize='md'
      fontFamily='body'
      placeholderTextColor='gray.300'
      color='white'
      {...rest}
      _focus={{
        borderWidth: 1,
        borderColor: 'green.500',
        bg: 'gray.700',
      }}
    />
  );
}
