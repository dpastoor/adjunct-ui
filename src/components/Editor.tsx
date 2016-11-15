
import * as React from 'react';
import {observer} from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';
import ChatModel from '../models/ChatModel';
interface Props {
    chat: ChatModel,
    editorWidth: number
}

@observer
class Editor extends React.Component<Props, {}> {
  public editor
  public model
  constructor(props: Props) {
    super(props)
    this.state = {
      code: "# code here"
    }
  }

  public editorDidMount(editor) {
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    this.model = editor.getModel();
  }
  public onChange(newValue, e) {
    // console.log('onChange', newValue, e);
    console.log(this.editor.getValue())
  }

  public setEditorValue(val) {
      this.editor.setValue(val)
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
        <div>  
        <button
          onClick={
              () => this.model.setValue("\n #some code \n")
          }
        >
        click to update code
        </button>
            <MonacoEditor
                height={window.innerHeight-100}
                width={this.state.editorWidth}
                language="r"
                value={this.state.code}
                options={options}
                onChange={this.onChange.bind(this)}
                editorDidMount={this.editorDidMount.bind(this)}
          />
        </div>
    );
  }
}

export default Editor
