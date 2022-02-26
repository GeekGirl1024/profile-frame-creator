import React from 'react';
import ReactDOM from 'react-dom';

import ProfileFrameCreator from './profile-frame-creator/profile-frame-creator.jsx';

class App extends React.Component {	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello World
        </header>
        <div>yay</div>
        <ProfileFrameCreator />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
