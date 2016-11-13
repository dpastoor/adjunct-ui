import * as React from 'react';
import * as ReactDOM from 'react-dom'
import './App.css';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';
import MonacoEditor from 'react-monaco-editor';
import {Page, Row, Column, utils } from 'hedron';

import {Api} from './api/api'
interface Props {}


@observer
class App extends React.Component<Props, {}> {
  public editor
  constructor(props: Props) {
    super(props)
    this.state = {
      code: "# code here",
      renderedHtml: "code",
      editorWidth: 500
    }
  }

  public submitCode() {
    Api.runCode(this.editor.getValue()).then((res) => {
      console.log(res)
      this.setState({
        code: this.editor.getValue(),
        renderedHtml: res.data
      })
  })
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
  componentDidMount() {
    this.setState({editorWidth: ReactDOM.findDOMNode(this.refs.editorCol).offsetWidth})
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
      <Row >
      <Column fluid med={6} lg={6}  
      >
      <Row >
      <Column fluid med={3} lg={3} >
      <div 
        style={{padding: '3'}}
        >
          <RaisedButton 
            label="Save Code"
            primary={true}
            fullWidth={true}
            onClick={this.submitCode.bind(this)}
          />
      
      </div>
      </Column>
      <Column fluid med={9} lg={9} >
      <div
        style={{padding: '3'}}
      >
            <RaisedButton 
              label="Submit Code"
              primary={true}
              fullWidth={true}
              onClick={this.submitCode.bind(this)}
            />
      </div>
        </Column>
      </Row>
      <Row >
        <Column med={10} lg={10} mdOffset={1} lgOffset={1}
        ref="editorCol"        
        >
            <MonacoEditor
                height={window.innerHeight-100}
                width={this.state.editorWidth}
                language="r"
                value={this.state.code}
                options={options}
                onChange={this.onChange.bind(this)}
                editorDidMount={this.editorDidMount.bind(this)}
          />
          </Column>
      </Row>
      </Column>
      <Column fluid med={6} lg={6} >
        <div
        dangerouslySetInnerHTML={{__html: this.state.renderedHtml}}
        />
      </Column>
      </Row>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
