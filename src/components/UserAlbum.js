import React from 'react';
import Album from './Album';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlbums } from '../actions/albumsActions';
import { getPhotos } from '../actions/photosActions';

class UserAlbum extends React.Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.getAlbums(userId);
    this.props.getPhotos();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.album.albums.length) {
      console.log(nextProps.album);
    }
  }

  render(){
    const { albums, loading } = this.props.album;
    const renderAlbums = albums.map((album,index) => <Album key={album.id} album={album} />)

    return(
      <div>
        <ol className="user-albums">
          {loading ? (<li type="none">Loading...</li>) : renderAlbums}
        </ol>
      </div>
    )
  }
}

UserAlbum.propTypes = {
  getAlbums: PropTypes.func.isRequired,
  getPhotos: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  album: state.album,
  photo: state.photo
});

export default connect(mapStateToProps, { getAlbums, getPhotos })(UserAlbum);