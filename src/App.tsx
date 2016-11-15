import * as React from 'react';
import * as ReactDOM from 'react-dom'
import './App.css';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';
import MonacoEditor from 'react-monaco-editor';
import {Page, Row, Column, utils } from 'hedron';

import {Api} from './api/api'
import {Chatbox} from './components/Chatbox'; 
import ChatModel from './models/ChatModel';
import Editor from './components/Editor';
interface Props {}

let chat = new ChatModel();
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
    Api.runCode(chat.msgText).then((res) => {
      console.log(res)
      chat.broadcastNewKnit()
      this.setState({
        renderedHtml: res.data
      })
  })
  }
  componentDidMount() {
    this.setState({editorWidth: ReactDOM.findDOMNode(this.refs.editorCol).offsetWidth})
    //this is obsenely hacky as it is just resubmitting the code and relying on caching
    // making it fast to knit, rather than just asking for the html file that is should
    // know exists now
    chat.editSocket.on('update:knit', msg => {
      Api.runCode(chat.msgText).then((res) => {
        this.setState({
          renderedHtml: res.data
        })
      })
    })
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
            <Editor
            chat={chat}
            editorWidth={this.state.editorWidth}
            >
            </Editor>
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
