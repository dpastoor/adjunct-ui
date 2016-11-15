
import * as React from 'react';
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import ChatModel from '../models/ChatModel';

let chat = new ChatModel()

interface Props {}

@observer
export class Chatbox extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
   <div>
   chat area
   <button
   onClick={
       () => chat.socket.emit('edit', JSON.stringify({
           clientID: chat.id,
           text: "some interesting edits"
       })
       )
   }
   ></button>
   id : {chat.id}
   <br />
   text: {chat.msgText}
   </div> 
    );
  }
}
