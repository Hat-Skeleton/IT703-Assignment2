import React, { useState, useEffect, useCallback } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStatus = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const API_URL = 'http://localhost:5024/';
  const { roomID } = useParams();

  // Define refreshRoom inside useEffect or wrap it with useCallback
  const refreshRoom = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetRoom/${roomID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRoom(data);
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  }, [roomID]);

  useEffect(() => {
    refreshRoom();
  }, [refreshRoom]);

  const handleStatusChange = event => {
    setSelectedStatus(event.target.value);
  };

  const updateRoomStatus = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/UpdateRoom`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: room[0]?.RoomID,
          status: selectedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the update is successful, refresh the room data
      refreshRoom();

      // Navigate to the Rooms page
      navigate('/rooms');
    } catch (error) {
      console.error('Error updating room status:', error);
    }
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
              </Tr>
            </Thead>
            <Tbody>
              {room.map(roomData => (
                <Tr key={roomData.RoomID}>
                  <Th>{roomData.RoomID}</Th>
                  <Th>{roomData.RoomType}</Th>
                  <Th>{roomData.MaxOccupancy}</Th>
                  <Th>{roomData.Status}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Select
          placeholder="Select option"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="VacantClean">Vacant Clean</option>
          <option value="VacantDirty">Vacant Dirty</option>
          <option value="OccupiedClean">Occupied Clean</option>
          <option value="OccupiedService">Occupied Service</option>
          <option value="OnMaintenance">On Maintenance</option>
        </Select>
        <Button onClick={updateRoomStatus}>Confirm</Button>
      </Box>
    </ChakraProvider>
  );
};

export default EditStatus;
