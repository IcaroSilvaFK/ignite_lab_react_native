import { VStack } from 'native-base';
import React, { useState } from 'react';
import firebase from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigation();

  function handleAddNewOrder() {
    if (!patrimony || !description) {
      Alert.alert('Solicitação', 'Por favor preencha todos os campos');
      return;
    }
    setIsLoading(true);
    firebase()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firebase.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso');
        navigate.goBack();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        Alert.alert(
          'Solitação',
          'Não foi possivel registrar sua solicitação por favor tente novamente'
        );
      });
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Solicitação' />
      <Input
        placeholder='Numero do patrimônio'
        mt={4}
        keyboardType='numeric'
        onChangeText={setPatrimony}
        value={patrimony}
      />
      <Input
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
        value={description}
      />

      <Button
        title='cadastrar'
        mt={5}
        isLoading={isLoading}
        onPress={handleAddNewOrder}
      />
    </VStack>
  );
}
