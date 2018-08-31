import React from 'react';
import { Accordion, Button, Confirm } from 'semantic-ui-react';
import Photos from './Photos';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPhotos } from '../actions/photosActions';

class Album extends React.Component {
  state = {
    activeIndex: -1
  }

  AccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    if(newIndex == 0) {
      this.props.getPhotos();
    }

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;

    return(
      <li>
        <div className="user-album">
          <p><span className="title">Title : </span>{this.props.album.title}</p>
        </div>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.AccordionClick}>
          View Photos
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Photos photo={this.props.photo} albumId={this.props.album.id}/>
          </Accordion.Content>
        </Accordion>
      </li>
    )
  }
}

Album.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  photo: state.photo
})

export default connect(mapStateToProps, { getPhotos })(Album);