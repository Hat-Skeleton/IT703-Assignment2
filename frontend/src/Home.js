'use client';

import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Home() {
  return React.createElement(
    Stack,
    { minH: '100vh', direction: { base: 'column', md: 'row' } },
    React.createElement(
      Flex,
      { p: 8, flex: 1, align: 'center', justify: 'center' },
      React.createElement(
        Stack,
        { spacing: 6, w: 'full', maxW: 'lg' },
        React.createElement(
          Heading,
          { fontSize: { base: '3xl', md: '4xl', lg: '5xl' } },
          React.createElement(
            Text,
            {
              as: 'span',
              position: 'relative',
              _after: {
                content: "''",
                width: 'full',
                height: useBreakpointValue({
                  base: '20%',
                  md: '30%',
                }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: '#92d050',
                zIndex: -1,
              },
            },
            'Tomive'
          ),
          React.createElement('br'),
          React.createElement(Text, { color: '#7030a0', as: 'span' }, 'Hotel')
        ),
        React.createElement(
          Text,
          {
            fontSize: { base: 'md', lg: 'lg' },
            color: 'gray.500',
          },
          'Rodent free since 2007.'
        ),
        React.createElement(
          Stack,
          { direction: { base: 'column', md: 'row' }, spacing: 4 },
          React.createElement(
            Button,
            {
              rounded: 'full',
              bg: '#7030a0',
              color: 'white',
              _hover: {
                bg: 'blue.500',
              },
            },
            'Book room'
          ),
          React.createElement(Button, { rounded: 'full' }, 'About Us')
        )
      )
    ),
    React.createElement(
      Flex,
      { flex: 1 },
      React.createElement(Image, {
        alt: 'Login Image',
        objectFit: 'cover',
        src: 'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg',
      })
    )
  );
}
