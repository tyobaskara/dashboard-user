import React from 'react';
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

      const target = 'user' + this.props.data.id;
      var element = document.getElementById(target);

      var list = document.getElementsByClassName("user-list-detail");
      for (var i = 0; i < list.length; i++) {
          list[i].classList.add("hide");
      }

      if(e.target.classList.contains('active')) {
        element.classList.add("hide");
        e.target.innerHTML = 'View detail';
      }
      else {
        var btn = document.getElementsByClassName("tab-btn");
        for (var i = 0; i < btn.length; i++) {
            btn[i].classList.remove("active");
            btn[i].innerHTML = 'View detail';
        }
        element.classList.remove("hide");
        e.target.innerHTML = 'Close detail';
      }

      e.target.classList.toggle('active');
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
            <li><a href={'mailto:' + this.props.data.email}>{this.props.data.email}</a></li>
            <li><a href="#" className="tab-btn" onClick={this.tabClick}>View detail</a></li>
        </ul>
        <div className="user-list-detail hide" id={'user' + this.props.data.id}>
          <UserListDetail />
        </div>
      </li>
    )
  }
}