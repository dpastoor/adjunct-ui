import {observable, action, computed} from 'mobx';
import io from 'socket.io-client'

export default class ChatModel {
    @observable msgText
    public id:string
    public socket: SocketIOClient.Socket
    constructor(msgText = "") {
        this.msgText = msgText;
        this.id = 'a' + new Date()
        this.socket = io('http://localhost:5000');
        let socket2 = io('http://localhost:5000/edits')
        this.socket.on('connection', msg => {
            console.log('established connection')
            console.log(msg)
        })
        this.socket.on('chat', msg => {
            console.log('established chat')
            console.log(msg)
        })
        socket2.on('chat', msg => console.log("chat2", msg))
        socket2.on('update', msg => {
            console.log('edit:')
            let msgContents = JSON.parse(msg)
            console.log(msgContents)
            if (msgContents.clientID !== this.id) {
                console.log("set new msg text: ", msgContents.text)
                this.msgText = msgContents.text
            }
        })
    }

}