import * as React from 'react';
import './App.css';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';
import MonacoEditor from 'react-monaco-editor';

import {Api} from './api/api'
interface Props {}


@observer
class App extends React.Component<Props, {}> {
  public editor
  constructor(props: Props) {
    super(props)
  }

  public submitFakeCode() {
    Api.runCode([""]).then((res) => console.log(res))
  }
  public editorDidMount(editor) {
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    // editor.onDidChangeCursorSelection(function(e) {
    //   console.log('selection: ', JSON.stringify(e.selection))
    // })
  }
  public onChange(newValue, e) {
    // console.log('onChange', newValue, e);
    console.log(this.editor.getValue())
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      theme: 'vs',
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      <MuiThemeProvider>
        <div className="App">
        <RaisedButton 
          label="Submit Code"
          primary={true}
          fullWidth={true}
          onClick={this.submitFakeCode}
        />
           <MonacoEditor
              height="500"
              width="600"
              language="r"
              value={'# code here'}
              options={options}
              onChange={this.onChange.bind(this)}
              editorDidMount={this.editorDidMount.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
