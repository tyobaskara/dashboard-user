import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Photos extends React.Component {
  render() {
    const { albumId } = this.props;
    const { photos , loading } = this.props.photo;
    const renderPhotos = photos.map((photo, index) => {
      if(photo.albumId === albumId) {
        return (
          <li key={photo.albumId+'_'+photo.id+photo.title}><img src={photo.thumbnailUrl} alt={photo.title} /></li>
        )
      }
    })

    return (
      <div>
        <ul className="user-photos">
          {loading ? (<li type="none">Loading Photo...</li>) : renderPhotos}
        </ul>
        {!renderPhotos.length && !loading && <div className="no-photo">No Photos Found..</div>}
      </div>
    )
  }
}

Photos.propTypes = {
  photo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  photo: state.photo
})

export default connect(mapStateToProps)(Photos);