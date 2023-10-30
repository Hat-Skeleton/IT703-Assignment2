import React from 'react';
import { Component } from 'react';
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

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  API_URL = 'http://localhost:5024/';

  componentDidMount() {
    this.refreshBookings();
  }

  async refreshBookings() {
    fetch(this.API_URL + 'api/Hotel/GetBookings')
      .then(response => response.json())
      .then(data => {
        this.setState({ bookings: data });
      });
  }

  async getName(id) {
    fetch(this.API_URL + `api/Hotel/GetCustomer?id=${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ bookings: data });
      });
  }

  render() {
    const { bookings } = this.state;
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <TableContainer>
            <Table variant="simple">
              {bookings.map(booking => (
                <Thead>
                  <Tr>
                    <Th>{booking.BookingID}</Th>
                    <Th>{booking.CustomerID}</Th>
                    <Th>{booking.RoomID}</Th>
                    <Th>{booking.CheckInDate}</Th>
                    <Th>{booking.CheckOutDate}</Th>
                  </Tr>
                </Thead>
              ))}
            </Table>
          </TableContainer>
        </Box>
      </ChakraProvider>
    );
  }
}
export default Bookings;
