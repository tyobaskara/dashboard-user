import React from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';

import UserInfo from './UserInfo';
import UserPost from './UserPost';
import UserAlbum from './UserAlbum';

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  tabClick = (e) => {
      e.preventDefault();

      var list = document.getElementsByClassName("user-list-detail");
      var i;
      for (i = 0; i < list.length; i++) {
          list[i].classList.add("hide");
      }

      const target = 'user' + this.props.data.id;
      var element = document.getElementById(target);
      element.classList.remove("hide");
  }

  render() {
    const panes = [
      { menuItem: 'Info', render: () => <Tab.Pane attached={false}><UserInfo data={this.props.data}/></Tab.Pane> },
      { menuItem: 'Post', render: () => <Tab.Pane attached={false}><UserPost data={this.props.data}/></Tab.Pane> },
      { menuItem: 'Album', render: () => <Tab.Pane attached={false}><UserAlbum data={this.props.data}/></Tab.Pane> },
    ]

    const UserListDetail = () => <Tab menu={{ pointing: true }} panes={panes} />

    return (
      <li>
        <ul className="list-body list-body--4">
            <li>{this.props.data.id}</li>
            <li>{this.props.data.name + ' (' + this.props.data.username + ')'}</li>
            <li>{this.props.data.email}</li>
            <li><a href="#" className="tab-btn" onClick={this.tabClick}>View detail</a></li>
        </ul>
        <div className="user-list-detail hide" id={'user' + this.props.data.id}>
          <UserListDetail />
        </div>
      </li>
    )
  }
}