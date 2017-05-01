import React, { Component } from 'react';
import icons from 'glyphicons';
import Profile from './Profile';
import Spotify from '../lib/spotify';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      artist: null,
      errorMessage: ''
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.search = this.search.bind(this);
  }
  //static propTypes = {
  //  stringProp: PropTypes.string.isRequired,
  //  arrayProp: PropTypes.array.isRequired, 
  //  funcProp: PropTypes.func.isRequired
  //};

  search() {
    const result = Spotify.search(this.state.query)
      .then(json => this.handleSearch(json))
      .catch(e => {
        this.displayErrorMessage('Please enter a search query')
      });
    return result;
  }

  handleSearch(artistJSON) {
    const artist = artistJSON.artists.items[0];
    if(artist) {
      return this.updateProfile(artistJSON)
    } else {
      this.displayErrorMessage('Artist not found, please try again');
    }
  }

  updateProfile(artistJSON) {
    const artist = artistJSON.artists.items[0];
    this.setState({
      artist: artist, 
      errorMessage: ''
    });
    return artistJSON;
  }

  displayErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  
  render() {
    return (
      <div className="tc pa5">
        <div id="App-title" className="f3">Music Master</div>
        <form onSubmit={ (e) => { e.preventDefault(); this.search(); } }>
          <input 
            className="db fl h2 w-90 ba bw2 b--lightest-blue" 
            type="text" 
            placeholder="Search for an artist"
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value }) }} />
          <button 
            className="db fl h2 button-reset border-box w-10 ba bw2 b--lightest-blue">
            {icons.magnifyingGlass}
          </button>
        </form>
        <div className="h1 cb error">{this.state.errorMessage}</div>
        <div id="Profile">
          <Profile artist={this.state.artist}/>
        </div>
        <Gallery />
      </div>
    );
  }
}

//App.defaultProps = {
  //
//};

// for docs on prop type validations type `reactvalidateproptypedocs`

export default App;