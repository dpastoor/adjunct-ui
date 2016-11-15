
import * as React from 'react';
import {observer, observable} from 'mobx-react';
import * as mobx from 'mobx';
import io from 'socket.io-client'
class ChatModel {
    @observable msgText
    public socket
    constructor(msgText = "") {
        // this.msgText = msgText
        // this.socket = io.connect('http://localhost:5000') 
        // this.socket.on('connection', function() {
        //     this.socket.send('hello')
        // })
    }
}
interface Props {}
@observer
export class Chatbox extends React.Component<Props, {}> {
    public socket: SocketIOClient.Socket
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
      console.log('about to set up chat')
       let chat = new ChatModel()
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
        console.log('setup chat and sent message');

       console.log('setup chat and sent message')
  }
  render() {
    return (
   <div>
   chat area
   <button
   onClick={
       () => this.socket.emit('edit', "some edits")
   }
   ></button>
   </div> 
    );
  }
}
