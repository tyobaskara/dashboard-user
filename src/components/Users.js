import React from 'react';
import { Helmet } from 'react-helmet';
import View from '../layout/View';
import UserList from './UserList';

const Users = () => (
  <View>
      <Helmet>
          <title>Users</title>
      </Helmet>

      <UserList />
  </View>
)

export default Users;