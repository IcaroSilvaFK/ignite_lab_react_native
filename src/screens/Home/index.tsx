import React, { useEffect, useState } from 'react';
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';

import Logo from '../../assets/logo_secondary.svg';
import Filter from '../../components/Filter';
import { Order } from '../../components/Order';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';
import { dateFormat } from '../../utils/fireStoreDateFormat';
import { Loading } from '../../components/Loading';

export interface IOrderProps {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  );
  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const { colors } = useTheme();
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firebase()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          //@ts-ignore
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });
        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  function handleOpenNewOrder() {
    navigate.navigate('new');
  }

  function handleOpenOrderDetails(id: string) {
    navigate.navigate('details', {
      orderId: id,
    });
  }

  function handleSignOutUser() {
    auth()
      .signOut()
      .catch((err) => {
        console.log(err);
        Alert.alert('Sair', 'Infelizmente não foi possivel sair');
      });
  }

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleSignOutUser}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w='full'
          mb={4}
          mt={8}
          justifyContent='space-between'
          alignItems='center'
        >
          <Heading color='gray.100'>Solicitações</Heading>
          <Text color='gray.200'>{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            title='Em andamento'
            type='open'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            title='Finalizados'
            type='closed'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Order
                {...item}
                onPress={() => handleOpenOrderDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                  Você ainda não possui {'\n'}
                  solicitações{' '}
                  {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title='Nova Solicitação' onPress={handleOpenNewOrder} />
      </VStack>
    </VStack>
  );
}
