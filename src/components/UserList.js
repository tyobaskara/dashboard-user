import React from 'react';
import User from './User';
import { Container } from 'semantic-ui-react';

export default class UserList extends React.Component {
    state = {
        users: [],
        status: false
    }

    componentDidMount() {
      this.getUsers();
    }

    getUsers = () => {
        const usersUrl = 'https://jsonplaceholder.typicode.com/users';

        fetch(usersUrl).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }
        ).then(jsonResponse => {
            if(jsonResponse != null) {
                this.setState({users: jsonResponse, status: true});
            }
        });
    }
  
    render() {
        const Users = this.state.users.map((user, index) => <User key={index} data={user} activeIndex={this.state.activeIndex}/>);

        return (
            <Container>
                <h1 className="dash-title">User List</h1>
                <div className="user-list">
                    <ul className="list-head list-head--4">
                        <li>Id</li>
                        <li>Name</li>
                        <li>Email</li>
                        <li>Action</li>
                    </ul>
                    <ul>{Users}</ul>
                </div>
            </Container>
        );
    }

  };