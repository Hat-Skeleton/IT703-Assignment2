// CreateBooking.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Input, Button, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const API_URL = 'http://localhost:5024/';

  useEffect(() => {
    // Fetch customers and rooms data
    fetchCustomers();
    fetchRooms();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetCustomers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetRooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleCustomerChange = event => {
    setSelectedCustomer(event.target.value);
  };

  const handleRoomChange = event => {
    setSelectedRoom(event.target.value);
  };

  const handleCheckInDateChange = event => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = event => {
    setCheckOutDate(event.target.value);
  };

  const createBooking = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/CreateBooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CustomerID: selectedCustomer,
          RoomID: selectedRoom,
          CheckInDate: checkInDate,
          CheckOutDate: checkOutDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the booking creation is successful, navigate to the Bookings page
      navigate('/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" mt={15} mr={5} ml={5}>
        <Select
          placeholder="Select Customer"
          value={selectedCustomer}
          onChange={handleCustomerChange}
        >
          {customers.map(customer => (
            <option key={customer.CustomerID} value={customer.CustomerID}>
              {`${customer.FirstName} ${customer.LastName}`}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Select Room"
          value={selectedRoom}
          onChange={handleRoomChange}
        >
          {rooms.map(room => (
            <option key={room.RoomID} value={room.RoomID}>
              {`${room.RoomType} - ${room.MaxOccupancy} occupants`}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Check In Date"
          value={checkInDate}
          onChange={handleCheckInDateChange}
        />
        <Input
          placeholder="Check Out Date"
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
        />
        <Button onClick={createBooking}>Create Booking</Button>
      </Box>
    </ChakraProvider>
  );
};

export default CreateBooking;
