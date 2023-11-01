import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './Home';
import Bookings from './Bookings';
import User from './User';
import NewUser from './NewUser';
import EditUser from './EditUser';
import Rooms from './Rooms';
import EditStatus from './EditStatus';
import CreateBooking from './CreateBooking'; // Import the CreateBooking component

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="user" element={<User />} />
            <Route path="newuser" element={<NewUser />} />
            <Route path="edituser/:userID" element={<EditUser />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="editstatus/:roomID" element={<EditStatus />} />
            <Route path="createbooking" element={<CreateBooking />} />{' '}
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
