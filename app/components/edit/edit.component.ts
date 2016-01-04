import {Component, OnInit} from 'angular2/core'
import {AppMetadataService} from 'app/services/app-metadata/app-metadata.service'
//import {BrowserStorageService} from 'app/services/browser-storage/browser-storage.service'
import {StoreService} from 'app/services/store/store.service'
import {GraphInfoService} from 'app/services/graph-info/graph-info.service'
//noinspection TypeScriptCheckImport
import * as moment_ from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
//noinspection TypeScriptUnresolvedVariable
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Component({
    selector: 'edit',
    templateUrl: 'app/templates/edit.html'
    //providers: [BrowserStorageService, GraphInfoService, StoreService]
})

export class AppEditComponent implements OnInit {
    public graphName: string;
    public graphKey: string;
    //public input;
    public graphData = [];
    public okToClear:boolean;

    // Most services are provided through the main app
    constructor(
        //private _meta: AppMetadataService,
        private _graphInfo: GraphInfoService,
        private _store: StoreService

    ) {}


    localTime(datetime) {
        //noinspection TypeScriptValidateTypes
        return moment(datetime).format('llll');
    }

    ago(datetime) {
        //noinspection TypeScriptValidateTypes
        return moment(datetime).fromNow();
    }

    saveGraphData() {
        var graphKey = this._graphInfo.graphNameToKey( this.graphName );
        this._store.save(graphKey, this.graphData);
    }

    clearGraphData() {
        var graphKey = this._graphInfo.graphNameToKey( this.graphName );
        this._store.save(graphKey, []);
    }

    removeGraphItem(itemId) {
        alert('Not implemented yet');
    }

    //setAppId() {
    //    this.appId = this._app.appId;
    //    this.appId = this.appId || 'appId-not-set';
    //}
    //
    //updateGraphData(storageId) {
    //    this.graphData = this._store.getVal(storageId);
    //}

    ngOnInit() {
        var meta = this._graphInfo.loadGraphMeta(null);
        this.graphName = meta.currentGraph;
        this.graphKey = this._graphInfo.graphNameToKey(this.graphName);
        this.graphData = this._store.getVal(this.graphKey);
        this.okToClear = true;

    }
}
