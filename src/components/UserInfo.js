import React from 'react';

import { Table } from 'semantic-ui-react'

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    const address = this.props.data.address;

    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Website</Table.HeaderCell>
              <Table.HeaderCell>Company</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}</Table.Cell>
              <Table.Cell>{data.phone}</Table.Cell>
              <Table.Cell><a href={'http://' + data.website} target="_blank">{data.website}</a></Table.Cell>
              <Table.Cell>{data.company.name}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}
