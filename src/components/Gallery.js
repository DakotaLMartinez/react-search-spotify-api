import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Gallery extends Component {
  // add a constructor for state using 'reactstate'
  static propTypes = {
    tracks: PropTypes.array,
  };  
  
  render() {
    return (
      <ul className="Gallery list pl0">
        {this.props.tracks && this.props.tracks.map((track) => {
          return <li 
                  key={track.id} 
                  className="track fl-ns w-25-ns">
                  <div className="relative ma1 aspect-ratio-ns aspect-ratio--1x1-ns">
                    <img
                      className="album-art"
                      src={track.album.images[1].url} />
                    <span 
                      className="track-name db f7 small w-100 tc bg-black o-70 absolute top-0"
                      style={{fontSize: '0.6rem'}}>
                      {track.name}
                    </span>
                  </div>
                  
                </li>
        })}
      </ul>
    );
  }
}

Gallery.defaultProps = {
  tracks: []  
};

// for docs on prop type validations type `reactvalidateproptypedocs`

export default Gallery;