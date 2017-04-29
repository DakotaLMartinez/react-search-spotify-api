import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import data from '../test/fixtures/beatles';

class Profile extends Component {
  static propTypes = {
   artist: PropTypes.object,
  };
  
  render() {
    let dummyArtist = { name: '', followers: { total: ''}, images: [{url: ''}], genres: [] };
    let artist = this.props.artist !== null ? this.props.artist : dummyArtist;
    //artist = data.artists.items[0];
    let genres = artist.genres;
    return (
      <div className="profile-wrapper cf tl">
      { artist !== dummyArtist &&
        <div className="profile">
          <img 
            src={artist.images[0].url} 
            alt="{artist.name} Profile" 
            id="profile-img"
            className="fl w4 h4 br-100 ba bw1 b--white" />
          <div className="artist-info fl border-box pa3 h4">
            <div id="artist-name" className="f3 pb2">{artist.name}</div>
            <div id="artist-follower-count" className="">{artist.followers.total} followers</div>
            <div id="artist-genres" className="">
              { genres.length > 0 &&
                genres.map((genre, k) => <span key={k}>{genre}</span>)
                      .reduce((prev,curr) => [prev, ', ', curr])
              }
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default Profile;