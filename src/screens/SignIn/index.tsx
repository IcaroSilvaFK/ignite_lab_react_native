import React, { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../../assets/logo_primary.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { colors } = useTheme();

  function handleSignIn() {
    if (!name || !password) {
      Alert.alert('Login', 'Informe email e senha');
      return;
    }
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(name, password)
      .catch((err) => {
        console.log(err);

        if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
        ) {
          Alert.alert('Entrar', 'E-mail ou senha inválido.');

          return;
        }
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Entrar', 'E-mail inválido.');

          return;
        }

        Alert.alert('Entrar', 'Não foi possível acessar.');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
        <Logo />
        <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
          Acesse sua conta
        </Heading>
        <Input
          placeholder='Email'
          mb={4}
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} marginLeft={4} />
          }
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder='Password'
          InputLeftElement={
            <Icon as={<Key color={colors.gray[300]} />} marginLeft={4} />
          }
          secureTextEntry
          mb={8}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title='Entrar'
          w='full'
          onPress={handleSignIn}
          isLoading={isLoading}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}
