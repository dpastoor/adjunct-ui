import {observable, action, computed} from 'mobx';
import io from 'socket.io-client'
import uuid from 'uuid'
export default class ChatModel {
    @observable msgText
    public id:string
    public socket: SocketIOClient.Socket
    public editSocket: SocketIOClient.Socket
    constructor(msgText = "") {
        this.msgText = msgText;
        this.id = uuid.v4();
        this.socket = io('http://localhost:5000');
        let editSocket = io('http://localhost:5000/edits')
        this.socket.on('connection', msg => {
            console.log('established connection')
            console.log(msg)
        })
        this.socket.on('chat', msg => {
            console.log('established chat')
            console.log(msg)
        })
        editSocket.on('chat', msg => console.log("chat2", msg))
        editSocket.on('update', msg => {
            console.log('edit:')
            let msgContents = JSON.parse(msg)
            console.log(msgContents)
            if (msgContents.clientID !== this.id) {
                console.log("set new msg text: ", msgContents.text)
                this.msgText = msgContents.text
            }
        })
        editSocket.on('update:knit', msg => {
            console.log('knit:')
            let msgContents = JSON.parse(msg)
            console.log(msgContents)
        })
        this.editSocket = editSocket;
    }

    @action broadcastEditorUpdate(text) {
       this.socket.emit('edit', JSON.stringify({
           clientID: this.id,
           text: text
       })
    }
    @action broadcastNewKnit(){
       this.socket.emit('edit:knit', JSON.stringify({
           clientID: this.id,
           text: "reknit"
       })
    }

}