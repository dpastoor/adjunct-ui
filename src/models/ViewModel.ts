import {observable, action} from 'mobx';
export default class ViewModel {
    @observable html: string
    constructor(html = "code") {
        this.html = html;
    }

    @action setHtml(text) {
        this.html = text
    }
}