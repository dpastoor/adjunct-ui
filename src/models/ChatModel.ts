import {observable, action, computed} from 'mobx';
import io from 'socket.io-client'
import uuid from 'uuid'
export default class ChatModel {
    @observable msgText: string
    @observable lastUpdateId: string
    public editTime: Date
    public id:string
    public socket: SocketIOClient.Socket
    public editSocket: SocketIOClient.Socket
    constructor(msgText = "") {
        this.msgText = msgText;
        this.id = uuid.v4();
        this.editTime = new Date();
        this.socket = io('/socket.io');
        let editSocket = io('/socket.io/edits')
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
            console.log('update')
            let msgContents = JSON.parse(msg)
            console.log(msgContents)
            if (msgContents.clientID !== this.id) {
                let msgEditTime = new Date(msgContents.editTime);
                if (msgEditTime > this.editTime) {
                    console.log("newer updates available")
                    this.msgText = msgContents.text
                    this.lastUpdateId = msgContents.clientID
                }
            }
        })
        editSocket.on('update:knit', msg => {
            console.log('knit:')
            let msgContents = JSON.parse(msg)
        })
        this.editSocket = editSocket;
    }

    @action broadcastEditorUpdate(text) {
       this.socket.emit('edit', JSON.stringify({
           clientID: this.id,
           text: text,
           editTime: this.editTime
       })
       )
    }
    @action broadcastNewKnit(){
       this.socket.emit('edit:knit', JSON.stringify({
           clientID: this.id,
           text: "reknit"
       })
    }

}