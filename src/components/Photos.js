import React from 'react';

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
        {!renderPhotos.length && <div className="no-photo">No Photos Found..</div>}
      </div>
    )
  }
}

export default Photos;