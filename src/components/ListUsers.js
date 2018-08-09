import React from 'react';
import { Link } from 'react-router-dom'

export default class ListUsers extends React.Component {
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
        const Users = this.state.users.map((user, index) => {
            return (
                <li key={index}>
                    <ul>
                        <li>{user.id}</li>
                        <li>{user.name + ' (' + user.username + ')'}</li>
                        <li>{user.email}</li>
                        <li><a href="#" className="tab-btn" data-target={'user' + user.id}>View detail</a></li>
                    </ul>
                    <div className="tab-content" id="{'user' + user.id}">
                        <ul>
                            <li>
                                <a href="#" className="info-btn" data-target={'info' + user.id}>Info</a>
                            </li>
                            <li>
                                <a href="#" data-target={'post' + user.id}>Post</a>
                            </li>
                            <li>
                                <a href="#" data-target={'album' + user.id}>Album</a>
                            </li>
                        </ul>
                        <div className="user-list-detail active" id={'info' + user.id}>
                            "address": 
                                "street": {user.address.street},
                                "suite": {user.address.suite},
                                "city": {user.address.city},
                                "zipcode": {user.address.zipcode}
                            "phone": {user.phone},
                            "website": {user.website},
                            "company": 
                                "name": {user.company.name},
                                "catchPhrase": {user.company.catchPhrase},
                                "bs": {user.company.bs},
                        </div>
                        <div className="user-list-detail" id={'post' + user.id}>
                            post
                        </div>
                        <div className="user-list-detail" id={'album' + user.id}>
                            album
                        </div>
                    </div>
                </li>
            )
        });

        return (
          <ul className="users-list">
            {Users}
          </ul>
        );
    }

  };