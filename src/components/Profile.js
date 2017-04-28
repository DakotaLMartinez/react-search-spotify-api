import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  static propTypes = {
   artist: PropTypes.object.isRequired,
  };
  
  render() {
    let artist = this.props.artist  
    return (
      <div>
        <div id="artist-name">{artist.name}</div>
        <div id="artist-follower-count">{artist.followers.total}</div>
      </div>
    );
  }
}

Profile.defaultProps = {
  artist: { name: '', followers: { total: ''} }  
};

export default Profile;