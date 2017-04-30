import React, { Component } from 'react';
import icons from 'glyphicons';
import Profile from './Profile';
import Spotify from '../spotify';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      artist: null
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.search = this.search.bind(this);
    this.getApiUrl = this.getApiUrl.bind(this);
  }
  //static propTypes = {
  //  stringProp: PropTypes.string.isRequired,
  //  arrayProp: PropTypes.array.isRequired, 
  //  funcProp: PropTypes.func.isRequired
  //};

  getApiUrl() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    return `${BASE_URL}?q=${encodeURI(this.state.query)}&type=artist&limit=1`;
  }

  search() {
    //console.log('this.state', this.state);
    
    const result = Spotify.search(this.state.query)
      .then(json => this.updateProfile(json));
      console.log(result);
    return result;
  }

  updateProfile(artistJSON) {
    const artist = artistJSON.artists.items[0];
    this.setState({artist});
    return artistJSON;
  }
  
  render() {
    return (
      <div className="tc pa5">
        <div id="App-title" className="f3">Music Master</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
            className="db fl h2 w-90 ba bw2 b--lightest-blue" 
            type="text" 
            placeholder="Search for an artist"
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value }) }} />
          <button 
            className="db fl h2 button-reset border-box w-10 ba bw2 b--lightest-blue"
            onClick={() => this.search()}>
            {icons.magnifyingGlass}
          </button>
        </form>
        <div className="h1 cb"></div>
        <div id="Profile">
          <Profile artist={this.state.artist}/>
        </div>
        <div id="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

//App.defaultProps = {
  //
//};

// for docs on prop type validations type `reactvalidateproptypedocs`

export default App;