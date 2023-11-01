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

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const API_URL = 'http://localhost:5024/';

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/GetUsers`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const editUser = userID => {
    // Navigate to edituser page with the userID
    navigate(`/edituser/${userID}`);
  };

  const deleteUser = async userID => {
    try {
      const response = await fetch(`${API_URL}api/Hotel/DeleteUser/${userID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('User deleted successfully');

      // Refresh the user list after deletion
      refreshUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" mt={15} mr={5} ml={5}>
        <Button mb={5} onClick={() => navigate('/newuser')}>
          Create New User
        </Button>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr backgroundColor={'#7030a0'}>
                <Th textColor={'white'}>User Id</Th>
                <Th textColor={'white'}>Username</Th>
                <Th textColor={'white'}>User Type</Th>
                <Th textColor={'white'}>Edit User</Th>
                <Th textColor={'white'}>Delete User</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user.UserID}>
                  <Th>{user.UserID}</Th>
                  <Th>{user.UserName}</Th>
                  <Th>{user.UserType}</Th>
                  <Th>
                    <Button onClick={() => editUser(user.UserID)}>Edit</Button>
                  </Th>
                  <Th>
                    <Button onClick={() => deleteUser(user.UserID)}>
                      Delete
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

export default User;
