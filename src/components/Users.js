import React from 'react';
import View from '../layout/View';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import User from './User';

export default class Users extends React.Component {
    state = {
        users: [],
        getUserFinished: false,
        isGetError: false
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
            this.setState({isGetError: true, getUserFinished: true});
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }
        ).then(jsonResponse => {
            if(jsonResponse != null) {
                this.setState({users: jsonResponse, getUserFinished: true, isGetError: false});
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({isGetError: true, getUserFinished: true});
        });
    }
  
    render() {
        const Users = this.state.users.map((user, index) => <User key={index} data={user}/>);

        return (
            <View>
                <Helmet>
                    <title>Users</title>
                </Helmet>
                
                <Container>
                    <h1 className="dash-title">User List</h1>
                    {!this.state.getUserFinished && <div className="text-center">Loading...</div>}
                    {this.state.isGetError && <div className="text-center">Please try again later...</div>}

                    {this.state.getUserFinished &&
                    <ul className="list-head list-head--4">
                        <li>Id</li>
                        <li>Name</li>
                        <li>Email</li>
                        <li>Action</li>
                    </ul>}
                    <div className="user-list">
                        <ul>{this.state.getUserFinished && Users}</ul>
                    </div>
                </Container>
            </View>
        );
    }

  };