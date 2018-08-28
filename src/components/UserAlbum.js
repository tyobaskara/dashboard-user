import React from 'react';
import Album from './Album';

export default class UserAlbum extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    albums: [],
    userId: this.props.userId,
    status: false
  }

  componentDidMount() {
    this.getAlbums();
  }

  getAlbums = () => {
    const {userId} = this.state;
    const albumsUrl = 'https://jsonplaceholder.typicode.com/albums?userId=' + userId;

    fetch(albumsUrl).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    })
    .then(jsonResponse => {
        if(jsonResponse != null) {
          this.setState({albums: jsonResponse, status: true});
        }
    });
  }

  render(){
    const Albums = this.state.albums.map((album,index) => <Album key={index} album={album} />)

    return(
      <div>
        <ol className="user-albums">
          {Albums}
        </ol>
      </div>
    )
  }
}