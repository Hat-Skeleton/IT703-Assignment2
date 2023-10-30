import React from 'react';
import { Component } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  TableCaption,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Bookings from './Bookings';
import Home from './Home';
import { Layout } from './Layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
    this.router = createBrowserRouter([
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'bookings',
            element: <Bookings />,
          },
        ],
      },
    ]);
  }

  render() {
    const { bookings } = this.state;
    return (
      <ChakraProvider theme={theme}>
        <RouterProvider router={this.router} />
      </ChakraProvider>
    );
  }
}

export default App;
