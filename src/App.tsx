import * as React from 'react';
import './App.css';
import {observer} from 'mobx-react';

interface Props {}

@observer
class App extends React.Component<Props, {}> {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React I am excited to be here </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
