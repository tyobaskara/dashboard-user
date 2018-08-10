import React from 'react';
import Photos from './Photos';

export default class Album extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    activeIndex: -1,
    albumId: this.props.albumId,
    photos: [],
    userId: this.props.userId,
    status: false
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    const {albumId} = this.state;
    const photosUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=1' + albumId;

    fetch(photosUrl).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    })
    .then(jsonResponse => {
        if(jsonResponse != null) {
          console.log(jsonResponse);
          this.setState({photos: jsonResponse, status: true});
        }
    });
  }

  render() {
    const { activeIndex } = this.state;

    const Photos = this.state.photos.map((photo,index) => <li><img src={photo.thumbnailUrl} alt={photo.title}/></li>)

    return(
      <div>
        <ul className="user-photos">
          {Photos}
        </ul>
        {!this.state.photos.length && <div className="no-photo">No Photos Found..</div>}
      </div>
    )
  }
}