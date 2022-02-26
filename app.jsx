import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello World
        </header>
        <div>yay</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
