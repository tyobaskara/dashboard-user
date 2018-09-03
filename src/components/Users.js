import React from 'react';
import View from '../layout/View';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import User from './User';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';

class Users extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }
  
    render() {
        const { users, loading } = this.props.user;

        const renderUsers = users.map((user, index) => <User key={index} data={user}/>);

        let usersFailedContent;

        if(!loading && users === null) {
            usersFailedContent =  (
                <div className="text-center"> Something went wrong... Try again later..</div>
            )
        }

        return (
            <View>
                <Helmet>
                    <title>Users</title>
                </Helmet>
                
                <Container>
                    <h1 className="dash-title">User List</h1>
                    {loading && <div className="text-center">Loading...</div>}
                    {usersFailedContent}

                    {!loading && (
                        <div>
                            <ul className="list-head list-head--4">
                                <li>Id</li>
                                <li>Name</li>
                                <li>Email</li>
                                <li>Action</li>
                            </ul>

                            <div className="user-list">
                                <ul>{renderUsers}</ul>
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
    user: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUsers })(Users);