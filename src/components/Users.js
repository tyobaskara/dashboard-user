import React from 'react';
import { Helmet } from 'react-helmet';
import View from '../layout/View';

const Users = () => (
  <View>
      <Helmet>
          <title>Users</title>
      </Helmet>

      <div className="container">
          <h1>Users List</h1>
      </div>
  </View>
)

export default Users;