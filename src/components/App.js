import React, { Component } from 'react';
import icons from 'glyphicons';

class App extends Component {
  // add a constructor for state using 'reactstate'
  //static propTypes = {
  //  stringProp: PropTypes.string.isRequired,
  //  arrayProp: PropTypes.array.isRequired, 
  //  funcProp: PropTypes.func.isRequired
  //};
  
  render() {
    return (
      <div className="tc pa5">
        <div id="App-title">Music Master</div>
        <form action="">
          <input className="db fl h2 w-90 ba bw2 b--lightest-blue" type="text" placeholder="Search for an artist" />
          <button className="db fl h2 button-reset border-box w-10 ba bw2 b--lightest-blue">{icons.magnifyingGlass}</button>
        </form>
        <div id="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
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