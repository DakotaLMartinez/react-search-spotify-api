import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Gallery extends Component {
  // add a constructor for state using 'reactstate'
  static propTypes = {
    //stringProp: PropTypes.string.isRequired,
    tracks: PropTypes.array, 
  //  funcProp: PropTypes.func.isRequired
  };  

  componentDidMount() {
    // this.interval = setInterval(this.fetchData, 15000);
    // add event listeners, ajax requests, or timeouts here
    //console.log(this.props.tracks);
  }
  
  render() {
    return (
      <ul className="Gallery">
        {this.props.tracks.map((track) => {
          return <li key={track.id} className="track">{track.id}</li>
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