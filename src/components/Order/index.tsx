import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from 'native-base';
import React from 'react';
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from 'phosphor-react-native';

export interface IOrderProps extends IPressableProps {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

export function Order({ id, patrimony, status, when, ...rest }: IOrderProps) {
  const { colors } = useTheme();

  const statusColor =
    status === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg='gray.600'
        mb={4}
        alignItems='center'
        justifyContent='space-between'
        rounded='sm'
        overflow='hidden'
      >
        <Box h='full' w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={5}>
          <Text color='gray.100'>Patrimônio {patrimony}</Text>
          <HStack alignItems='center'>
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color='gray.200' fontSize='xs' ml={1}>
              {when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg='gray.500' h={12} w={12} mr={5}>
          {status === 'closed' ? (
            <CircleWavyCheck size={24} color={statusColor} />
          ) : (
            <Hourglass size={24} color={statusColor} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}
