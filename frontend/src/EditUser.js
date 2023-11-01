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

const EditUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const API_URL = 'http://localhost:5024/';
  const { userID } = useParams();

  // Define refreshUsers inside useEffect or wrap it with useCallback
  const refreshUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetUser/${userID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [userID]);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  const handleUserTypeChange = event => {
    setSelectedUserType(event.target.value);
  };

  const updateUserType = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/UpdateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user[0]?.UserID,
          type: selectedUserType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the update is successful, refresh the user data
      refreshUsers();

      // Navigate to the User page
      navigate('/user');
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" mt={15} mr={5} ml={5}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr backgroundColor={'#7030a0'}>
                <Th textColor={'white'}>User Id</Th>
                <Th textColor={'white'}>Username</Th>
                <Th textColor={'white'}>User Type</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.map(userData => (
                <Tr key={userData.UserID}>
                  <Th>{userData.UserID}</Th>
                  <Th>{userData.UserName}</Th>
                  <Th>{userData.UserType}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Select
          placeholder="Select option"
          value={selectedUserType}
          onChange={handleUserTypeChange}
        >
          <option value="Manager">Manager</option>
          <option value="Reception">Reception</option>
          <option value="Housekeeper">Housekeeper</option>
        </Select>
        <Button onClick={updateUserType}>Confirm</Button>
      </Box>
    </ChakraProvider>
  );
};

export default EditUser;
