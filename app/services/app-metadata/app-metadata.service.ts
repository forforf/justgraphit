import {Injectable} from 'angular2/core'
import {Observable, Subject} from 'rxjs/Rx'

@Injectable()

export class AppMetadataService {
    public appId: string;
    public graphsListKey: string;
    public appSubject: Subject;

    constructor() {
        this.appSubject = new Subject();
    }
}