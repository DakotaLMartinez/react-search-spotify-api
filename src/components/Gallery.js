import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      playingUrl: null, 
      audio: null, 
      currentTime: 0
    }
  }
  static propTypes = {
    tracks: PropTypes.array,
  };  

  componentDidMount() {
    this.interval = setInterval(this.isPlaying.bind(this), 8000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  isPlaying() {
    if(!this.state.playing) {
      return false;
    } else if(this.state.audio && this.state.audio.currentTime >= 30) {
      this.resetPlayer();
      return false;
    } else {
      return true;
    }
  }

  handlePlayClick(previewUrl) {
    if(this.isPlaying()) {
      if(this.state.playingUrl === previewUrl) {
        this.pausePlayback();
      } else {
        this.resetPlayer();
        this.startPlaying(previewUrl);
      }
    } else {
      this.startPlaying(previewUrl);
    }
  }

  pausePlayback() {
    this.state.audio.pause();
    this.setState({
      playing: false
    });
  }

  resetPlayer() {
    let audio = this.state.audio;
    audio.pause();
    audio.currentTime = 0;
    audio.src = null;
    this.setState({
      playing: false,
      playingUrl: null, 
      audio
    });
  }

  startPlaying(url) {
    if(this.state.playingUrl === url) {
      this.restartPlayback();
    } else {
      let audio = this.state.audio ? this.state.audio : new Audio(url);
      audio.src = url;
      audio.currentTime = 0;
      this.setState({
        playing: true, 
        playingUrl: url, 
        audio
      });
      audio.play();
    }
  }

  restartPlayback() {
    this.state.audio.play();
    this.setState({
      playing: true
    });
  }
  
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
                      src={track.album.images[1].url} 
                      onClick={() => this.handlePlayClick(track.preview_url)}/>
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

export default Gallery;