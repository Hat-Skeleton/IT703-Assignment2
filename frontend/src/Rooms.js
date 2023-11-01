import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const API_URL = 'http://localhost:5024/';

  useEffect(() => {
    refreshRooms();
  }, []);

  const refreshRooms = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetRooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const editStatus = roomID => {
    // Navigate to editstatus page with the roomID
    navigate(`/editstatus/${roomID}`);
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" mt={15} mr={5} ml={5}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr backgroundColor={'#7030a0'}>
                <Th textColor={'white'}>Room ID</Th>
                <Th textColor={'white'}>Room Type</Th>
                <Th textColor={'white'}>Max Occupancy</Th>
                <Th textColor={'white'}>Status</Th>
                <Th textColor={'white'}>Edit Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rooms.map(room => (
                <Tr key={room.RoomID}>
                  <Th>{room.RoomID}</Th>
                  <Th>{room.RoomType}</Th>
                  <Th>{room.MaxOccupancy}</Th>
                  <Th>{room.Status}</Th>
                  <Th>
                    <Button onClick={() => editStatus(room.RoomID)}>
                      Edit
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
};

export default Rooms;
