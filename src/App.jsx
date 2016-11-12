var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MonacoEditor from 'react-monaco-editor';
let App = class App extends React.Component {
    constructor(props) {
        super(props);
    }
    editorDidMount(editor) {
        console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
        this.editor = editor;
        // editor.onDidChangeCursorSelection(function(e) {
        //   console.log('selection: ', JSON.stringify(e.selection))
        // })
    }
    onChange(newValue, e) {
        // console.log('onChange', newValue, e);
        console.log(this.editor.getValue());
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
        return (<MuiThemeProvider>
        <div className="App">
          another test
           <MonacoEditor height="500" width="600" language="r" value={'# code here'} options={options} onChange={this.onChange.bind(this)} editorDidMount={this.editorDidMount.bind(this)}/>
        </div>
      </MuiThemeProvider>);
    }
};
App = __decorate([
    observer
], App);
export default App;
//# sourceMappingURL=App.jsx.map