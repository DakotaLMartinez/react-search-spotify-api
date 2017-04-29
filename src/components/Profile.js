import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  static propTypes = {
   artist: PropTypes.object,
  };
  
  render() {
    let artist = this.props.artist !== null ? this.props.artist : { name: '', followers: { total: ''}, images: [{url: ''}], genres: [] };
    let genres = artist.genres;
    return (
      <div className="profile">
        <img src={artist.images[0].url} alt="{artist.name} Profile" id="profile-img"/>
        <div id="artist-name">{artist.name}</div>
        <div id="artist-follower-count">{artist.followers.total}</div>
        <div id="artist-genres">
          { genres.length > 0 &&
            genres.map((genre, k) => <span key={k}>{genre}</span>)
                  .reduce((prev,curr) => [prev, ', ', curr])
          }
        </div>
      </div>
    );
  }
}

export default Profile;