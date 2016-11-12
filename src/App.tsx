import * as React from 'react';
import './App.css';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
interface Props {}


@observer
class App extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
           Hello 
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
