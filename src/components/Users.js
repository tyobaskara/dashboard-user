import React from 'react';
import View from '../layout/View';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import User from './User';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';

class Users extends React.Component {
    state = {
        users: [],
        usersLoading: true
    }

    componentDidMount() {
        this.props.getUsers();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.users.data) {
            this.setState({ 
                users: newProps.users.data,
                usersLoading: newProps.users.usersLoading
            });
        }
    }
  
    render() {
        const Users = this.state.users.map((user, index) => <User key={index} data={user}/>);

        let usersFailedContent;

        if(!this.state.usersLoading && this.state.users.length < 0) {
            usersFailedContent =  (
                <div className="text-center"> Something went wrong...</div>
            )
        }

        return (
            <View>
                <Helmet>
                    <title>Users</title>
                </Helmet>
                
                <Container>
                    <h1 className="dash-title">User List</h1>
                    {this.state.usersLoading && <div className="text-center">Loading...</div>}
                    {usersFailedContent}

                    {!this.state.usersLoading && (
                        <div>
                            <ul className="list-head list-head--4">
                                <li>Id</li>
                                <li>Name</li>
                                <li>Email</li>
                                <li>Action</li>
                            </ul>

                            <div className="user-list">
                                <ul>{Users}</ul>
                            </div>
                        </div>
                    )}
                </Container>
            </View>
        );
    }

  };


Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps, { getUsers })(Users);