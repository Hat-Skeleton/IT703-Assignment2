import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const API_URL = 'http://localhost:5024/';

export default function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToUser, setRedirectToUser] = useState(false); // New state for redirection

  useEffect(() => {
    // useEffect to handle redirection when redirectToUser state changes
    if (redirectToUser) {
      window.location.href = '/user'; // Redirect to '/user'
    }
  }, [redirectToUser]);

  const handleSubmit = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(API_URL + 'api/Hotel/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the creation is successful, set redirectToUser to true
      setRedirectToUser(true);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Create new account
        </Heading>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
