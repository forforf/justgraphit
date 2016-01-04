import {Injectable} from 'angular2/core'

@Injectable()
export class BrowserStorageService {
    public getItem: Function;
    public setItem: Function;
    public removeItem: Function;

    constructor() {
        this.getItem = localStorage.getItem.bind(localStorage);
        this.setItem = localStorage.setItem.bind(localStorage);
        this.removeItem = localStorage.removeItem.bind(localStorage);
    }

    storageContainer() {
        return localStorage;
    }
}