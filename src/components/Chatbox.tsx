
import * as React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import io from 'socket.io-client'
class ChatModel {
    @observable msgText
    public id
    public socket: SocketIOClient.Socket
    constructor(msgText = "") {
        this.socket = io('http://localhost:5000');
        this.socket.on('connection', msg => {
            console.log('established connection')
            console.log(msg)
        })
        this.socket.on('chat', msg => {
            console.log('established chat')
            console.log(msg)
        })
        this.socket.on('edit', msg => {
            console.log('edit:')
            console.log(msg)
        })
        this.socket.emit('chat', 'hello from client');
    }
}
interface Props {}
@observer
export class Chatbox extends React.Component<Props, {}> {
  public chat: ChatModel
  constructor(props: Props) {
    super(props)
       this.chat = new ChatModel()
  }

  componentDidMount() {
      console.log('about to set up chat')
       
        console.log('setup chat and sent message');

       console.log('setup chat and sent message')
  }
  render() {
    return (
   <div>
   chat area
   <button
   onClick={
       () => this.chat.socket.emit('edit', "some edits")
   }
   ></button>
   </div> 
    );
  }
}
