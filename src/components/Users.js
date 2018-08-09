import React from 'react';
import { Helmet } from 'react-helmet';
import View from '../layout/View';
import ListUsers from './ListUsers';

const Users = () => (
  <View>
      <Helmet>
          <title>Users</title>
      </Helmet>

      <h1 className="dash-title">Users List</h1>
      <ListUsers />
  </View>
)

export default Users;