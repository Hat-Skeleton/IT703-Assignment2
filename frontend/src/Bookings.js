import React from 'react';
import { Component } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Container,
  Grid,
  theme,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  TableCaption,
  Tbody,
  Button,
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

  async checkIn(status, id) {
    try {
      const response = await fetch(
        this.API_URL + `api/Hotel/UpdateBookings?status=${status}&id=${id}`,
        {
          method: 'PUT',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      this.refreshBookings();
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  }

  async checkOut(status, id) {
    try {
      const response = await fetch(
        this.API_URL + `api/Hotel/UpdateBookings?status=${status}&id=${id}`,
        {
          method: 'PUT',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      this.refreshBookings();
    } catch (error) {
      console.error('Error during check-out:', error);
    }
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
        <Box textAlign="center" fontSize="xl" mt={15} mr={5} ml={5}>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr backgroundColor={'#7030a0'}>
                  <Th textColor={'white'}>Booking ID</Th>
                  <Th textColor={'white'}>Customer ID</Th>
                  <Th textColor={'white'}>Room ID</Th>
                  <Th textColor={'white'}>CheckInDate</Th>
                  <Th textColor={'white'}>CheckOutDate</Th>
                  <Th textColor={'white'}>Check In Status</Th>
                  <Th textColor={'white'}>Check In</Th>
                  <Th textColor={'white'}>Check Out</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map(booking => (
                  <Tr key={booking.BookingID}>
                    <Th>{booking.BookingID}</Th>
                    <Th>{booking.CustomerID}</Th>
                    <Th>{booking.RoomID}</Th>
                    <Th>{booking.CheckInDate}</Th>
                    <Th>{booking.CheckOutDate}</Th>
                    <Th>
                      {booking.CheckStatus ? 'Checked in' : 'Not checked in'}
                    </Th>
                    <Th>
                      <Button
                        onClick={() => this.checkIn(1, booking.BookingID)}
                      >
                        Check In
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        onClick={() => this.checkOut(0, booking.BookingID)}
                      >
                        Check Out
                      </Button>
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ChakraProvider>
    );
  }
}
export default Bookings;
