
import * as React from 'react';
import {observer} from 'mobx-react';
import {autorun} from 'mobx';
import MonacoEditor from 'react-monaco-editor';
import ChatModel from '../models/ChatModel';
import * as _ from 'lodash';
interface Props {
    chat: ChatModel,
    editorWidth: number
}

@observer
class Editor extends React.Component<Props, {}> {
  public editor
  public model
  public chat
  constructor(props: Props) {
    super(props)
    this.state = {
      code: "# code here"
    }
    this.chat = this.props.chat
  }

  public editorDidMount(editor) {
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.model = editor.getModel();
    this.editor = editor;

    // don't update so often as causes a bottleneck in websockets
    // that then ends up feeding back on itself from other editors trying
    // to reconcile differences
    let throttledUpdate = _.throttle(() => {
        console.log("throttled update")
      this.chat.broadcastEditorUpdate(this.editor.getValue())
      console.log("broadcast")
    }, 500)

    // cursor position changing represents changes are because you are
    // making the changes, not just that the changes are happening,
    // which can happen from updates coming in from other clients
    this.editor.onDidChangeCursorPosition((e) => {
    console.log('cursor position changed to:' + JSON.stringify(e.position));
    let position = e.position
    // ignore updates that were only because of resetting values propogating changes
    if (!(position.lineNumber === 1 && position.column === 1)) {
      this.chat.editTime = new Date()
      console.log('hitting deounce')
      throttledUpdate()
    }
    });
    autorun(() => {
      // want the editor position to be captured and maintained as any text is changing
        let position = this.editor.getPosition()
        this.editor.setValue(this.props.chat.msgText)
        this.editor.setPosition(position)
    })
  }
  public onChange(newValue, e) {
  }

  public setEditorValue(val) {
      this.editor.setValue(val)
  }

  render() {
    console.log('re-render monaco editor')
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
            <MonacoEditor
                height={window.innerHeight-100}
                width={this.state.editorWidth}
                language="r"
                value={"# add some code!"}
                options={options}
                onChange={this.onChange.bind(this)}
                editorDidMount={this.editorDidMount.bind(this)}
          />
        </div>
    );
  }
}

export default Editor
