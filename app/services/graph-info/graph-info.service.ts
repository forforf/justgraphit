import {Injectable, OnInit} from 'angular2/core'
import {Observable, Subject} from 'rxjs/Rx'

import {StoreService} from 'app/services/store/store.service'

@Injectable()
export class GraphInfoService implements OnInit {
    //public input = {};
    //public graphs = {};

    //private _currentGraphName: string;
    private _graphMetaKey: string;
    private _meta: { currentGraph: string, list: Array<string> };
    public graphSubject: Subject;

    constructor(
        private _store: StoreService
    ){
        this.graphSubject = new Subject();
        this._graphMetaKey = "all-graphs";
    }


    // getter/setters

    getCurrentGraphName(){
        return this._meta.currentGraph
    }

    // called before ngOnit?
    setCurrentGraphName( graphName ) {
        this._meta = this._meta || this.loadGraphMeta( this._graphMetaKey) || {};
        this._meta.currentGraph = graphName;
        // Send update to all subscribers that the currentGraphName has changed,
        // and for convenience will send the ID too
        var evt: Object = {
            currentGraphName: this.getCurrentGraphName(),
            currentGraphKey: this.graphNameToKey( this.getCurrentGraphName())
        };

        this.graphSubject.next(evt);

        return this.getCurrentGraphName();
    }


    getGraphMetaKey() {
        return this._graphMetaKey;
    }

    setGraphMetaKey(listKey) {
        this._graphMetaKey = listKey;
        // ToDo: Update the localStorage to reflect the new key.
    }

    // loaders/savers

    loadGraphData( graphKey ) {
        return this._store.getVal( graphKey );
    }

    saveGraphData( graphKey, graphData ) {
        this._store.save( graphKey, graphData );
    }

    loadGraphMeta( graphMetaKey ){
        graphMetaKey = graphMetaKey || this._graphMetaKey;
        console.log('getting graphMeta with :', graphMetaKey, this._graphMetaKey );
        var meta = this._store.getVal( graphMetaKey );
        if (meta === null || meta === undefined){ meta = {} }
        if( meta.list === null || meta.list === undefined){ meta.list=[] }
        return meta;
    }

    saveGraphMeta(meta) {
        console.log('saving key, meta', this.getGraphMetaKey(), meta);
        this._store.save( this.getGraphMetaKey(), meta)
    }

    // Instance Methods

    //ToDo: Type graphEntry (see input.compoent.ts)
    appendGraphData(graphKey, graphEntry) {
        this._store.append(graphKey, graphEntry);
    }

    encodeHost() {
        var host = window.location.host;
        return this._encode(host);
    }

    graphNameToKey(name) {
        return (name) ? this._encode(name) : null;
    }

    removeGraph( graphName ) {
        console.log('GraphInfo Deleting graph name: ', graphName );
        // remove graph data
        this._store.clear( this.graphNameToKey(graphName));

        var meta = this.loadGraphMeta(null);

        // remove graph from list
        console.log('index: ', meta.list.indexOf(graphName));
        var index = meta.list.indexOf(graphName);
        if (index>-1) {
            meta.list.splice(index, 1);
            console.log('meta list after graphName deleted:', meta.list);

            // remove graph as currentGraph (if it's current Graph)
            if (meta.currentGraph === graphName){
                meta.currentGraph = meta.list[0];
                this.setCurrentGraphName( meta.currentGraph );
            }

            this.saveGraphMeta(meta);
            console.log('saved meta:', this.loadGraphMeta(null));
        }
    }

    // pseudo-private

    _encode(s) {
        return btoa.call(window, s);
    }

    // Interfaces

    ngOnInit() {
        this._meta = this.loadGraphMeta( this._graphMetaKey);
        this._meta.currentGraph = "not set";
        //this._graphMetaKey = "all-graphs";
        //console.log('graphInfo-init graphMetaKey: ', this._graphMetaKey);
    }
}