import React, { useEffect, useState } from 'react';
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '@react-native-firebase/firestore';

import { Header } from '../../components/Header';
import { IOrderProps } from '../../components/Order';
import { OrderFirestoreDTO } from '../../DTOs/OrderDTO';
import { dateFormat } from '../../utils/fireStoreDateFormat';
import { Loading } from '../../components/Loading';
import {
  CircleWavyCheck,
  DesktopTower,
  Hourglass,
  Clipboard,
} from 'phosphor-react-native';

import { CardDetails } from '../../components/CardDetails';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

interface IRouteParams {
  orderId: string;
}

interface OrderDetails extends IOrderProps {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const { params } = useRoute();
  const { orderId } = params as IRouteParams;
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const { colors } = useTheme();
  const navigate = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    firebase()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          created_at,
          description,
          patrimony,
          status,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          when: dateFormat(created_at),
          description,
          patrimony,
          status,
          closed,
          solution,
        });
      });
    setIsLoading(false);
  }, []);

  function handleCloseOrder() {
    if (!solution) {
      Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação'
      );

      return;
    }

    firebase()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firebase.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada');
        navigate.goBack();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Solicitação', 'Não foi possivel encerrar a solicitação');
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} w='full' bg='gray.600'>
        <Header title='solicitação' />
      </Box>

      <HStack bg='gray.500' justifyContent='center' p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize='sm'
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title='equipamento'
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title='Descrição do problema'
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails
          title='Solução'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status !== 'closed' && (
            <Input
              multiline
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              value={solution}
              h={24}
              textAlignVertical='top'
            />
          )}

          {order.status === 'open' && (
            <Button
              title='Encerrar solicitação'
              mt={5}
              onPress={handleCloseOrder}
            />
          )}
        </CardDetails>
      </ScrollView>
    </VStack>
  );
}
