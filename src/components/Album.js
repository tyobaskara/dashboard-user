import React from 'react';
import { Accordion } from 'semantic-ui-react';
import Photos from './Photos';

class Album extends React.Component {
  state = {
    activeIndex: -1
  }

  AccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

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
            <Photos albumId={this.props.album.id}/>
          </Accordion.Content>
        </Accordion>
      </li>
    )
  }
}

export default Album;