import * as React from 'react';
import './App.css';
import {observer} from 'mobx-react';

interface Props {}


@observer
class App extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    let s: {counterValue: number} = {
      counterValue: 0
    }
    this.state = s;
    this.increment = this.increment.bind(this)
  }

  increment(): void {
    this.setState({
        counterValue: this.state.counterValue+1
    })
  }  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React I am excited to be here </h2>
        </div>
        <button 
        onClick={this.increment}
        >
        {this.state.counterValue}
        </button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
