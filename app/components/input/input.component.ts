import {Component, OnInit} from 'angular2/core';
import {Observable, Subject} from 'rxjs/Rx'

import {AppMetadataService} from 'app/services/app-metadata/app-metadata.service'
//import {StoreService} from 'app/services/store/store.service'
import {GraphInfoService} from 'app/services/graph-info/graph-info.service'
import {AppLineGraphComponent} from 'app/components/line-graph/line-graph'
//noinspection TypeScriptCheckImport
import * as moment_ from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
//noinspection TypeScriptUnresolvedVariable
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

//ToDo: Use Store abstraction not BrowserStorage
@Component({
    selector: 'app-input',
    templateUrl: 'app/templates/input.html',
    directives: [AppLineGraphComponent]
})

export class AppInputComponent implements OnInit {
    public static DROPDOWN_VISIBILITY_TIMER = 3500;
    public static DEFAULT_GRAPH_NAME = 'my first graph';


    //public graphs;
    public input: {
        name: string,
        number: number,
        invalidNumber: boolean,
        datetime: Object
    };
    public graphInfoSubscription;
    public graphList;
    //public note: Object;
    public focusTo: string;
    public onGraphNameClick: Subject;

    //// syntactic sugar
    //// bind local functions to the external services for less typing
    //public graphNameToKey: Function  = this._graphInfo.graphNameToKey.bind(this._graphInfo);

    //private _initMeta;
    private _graphMetaKey: string;

    // Most services are provided through the main app
    constructor(
        private _graphInfo: GraphInfoService,
        //private _store: StoreService,
        private _meta: AppMetadataService // This is different than GraphMeta
    ){
        this.onGraphNameClick = new Subject();
        this._graphMetaKey = _graphInfo.getGraphMetaKey();
        this.graphList = [];
    }

    // syntactic sugar
    graphNameToKey(name) {
        return this._graphInfo.graphNameToKey(name);
    }

    loadGraphMeta() {
        // will use currently set graphMetaKey
        return this._graphInfo.loadGraphMeta(null);
    }

    saveGraphMeta(meta) {
        this._graphInfo.saveGraphMeta(meta);
    }


    // Instance Methods

    addCurrentGraph(name) {
        console.log('adding graph and empty data: ', name)
        var graphKey = this.graphNameToKey(name);
        this._graphInfo.saveGraphData(graphKey, []);
        return graphKey;
    }

    addCurrentGraphNameToMeta(name) {
        var meta = this.loadGraphMeta();
        var index = meta.list.indexOf(name);
        if (index === -1) {
            meta.list.push(name);
            this.graphList = meta.list;
        }
        meta.currentGraph = name;
        this.saveGraphMeta(meta)
    }

    clear(){
        alert('clear stub');
    }

    lazyGraphKeyFromName(name) {
        console.log('lazyGraphKey from name:  ', name);
        var graphKey = this.graphNameToKey( name );
        console.log('getting graph data with key: ', graphKey);
        var graphData = this._graphInfo.loadGraphData( graphKey );

        console.log('graphKey, graphData', graphKey, graphData);

        // return graphKey if it exists
        if (graphData != null  && graphData.length) { return graphKey }


        // else we create a new entry (metadata and graph)
        this.addCurrentGraphNameToMeta(name);
        var newGraphKey = this.addCurrentGraph(name);
        return newGraphKey;
    }

    //getGraphIdFromNameInList(name, list) {
    //    var name = this.nameInList(name, list);
    //    return this.graphNameToKey(name);
    //}

    //nameInList(name, list){
    //    // if name is in list return name, else return null
    //    return (list.indexOf(name)>-1) ? name : null;
    //}

    removeGraph(graphName) {
        var metaBefore = this.loadGraphMeta();
        if (metaBefore.currentGraph === graphName){
            this.input.name = null;
        }
        this._graphInfo.removeGraph(graphName);
        var metaAfter = this.loadGraphMeta();
        this.graphList = metaAfter.list;

        //console.log('Deleting graph name: ', graphName );
        //// remove graph data
        //this._store.clear( this.graphNameToKey(graphName));
        //
        //var meta = this.getGraphMeta();
        //// remove graph from list
        //console.log('index: ', meta.list.indexOf(graphName));
        //var index = meta.list.indexOf(graphName);
        //if (index>-1) {
        //    meta.list.splice(index, 1);
        //    console.log('meta list after graphName deleted:', meta.list);
        //
        //    // remove graph as currentGraph (if it's current Graph)
        //    if (meta.currentGraph === graphName){
        //        meta.currentGraph = meta.list[0];
        //        this._graphInfo.currentGraphName = "";
        //        this.updateGraph(null);
        //    }
        //
        //    this.saveGraphMeta(meta);
        //    console.log('saved meta:', this.getGraphMeta());
        //}
        //
        //this.graphs.list.indexOf(graphName);
        //if (index>-1) {
        //    this.graphs.list.splice(index, 1);
        //}
    }

    //graphMeta() {
    //    console.log('getting graphMeta with :', this._graphsListKey );
    //    var meta = this._store.getVal( this._graphsListKey );
    //    if(!meta){ meta = {}; }
    //    if(!meta.list){ meta.list=[] }
    //    return meta;
    //}

    save() {
        // validate input
        //this.note.nan = isNaN( parseFloat(this.input.number) );
        this.input.invalidNumber = isNaN( this.input.number );

        // ignore if we try to graph a non-number
        if (this.input.invalidNumber){ return this.input.invalidNumber; }

        //var graphKey = this.lazyGraphId(this.input.name, this.graphs.list);
        var graphKey = this.lazyGraphKeyFromName(this.input.name);
        //noinspection TypeScriptValidateTypes
        this.input.datetime = moment();
        //var key = this._store.makeGraphKey( this._browserStorage.prefix, id);

        this._graphInfo.appendGraphData(graphKey, {number: this.input.number, datetime: this.input.datetime});

        // clear number
        this.input.number = null;

        this.updateGraph(this.input.name);
    }


    test(event) {
        console.log('test', event);
    }

    setCurrentName(name) {
        this.input.name = name;

        var graphKey = this.lazyGraphKeyFromName( this.input.name );
        //this.input.graphId = this.lazyGraphId( this.input.name, this.graphs.list);
        //var meta = { list: this.graphs.list, currentGraph: this.input.name };

        this.addCurrentGraphNameToMeta( this.input.name );
        this.focusTo = '#input-number';
        console.log('Name set, updata Graph to: ', this.input.name);
        this._graphInfo.setCurrentGraphName(this.input.name);

        // setCurrentGraphName will trigger an event on graphSubject
        // We should subscribe to that event to update the graph,
        // rather than do it here
        //this.updateGraph(this.input.name);

        // reset so next change can retrigger focus
        setTimeout( function(){ this.focusTo = null } )
    }

    updateGraph(graphName) {
        //console.log('Update Graph using name: ', graphName);
        //this.input.name = graphName;
        //this._graphInfo.setCurrentGraphName(this.input.name);
        //var meta = this.loadGraphMeta();
        //meta.currentGraph = this.input.name;
        //this.saveGraphMeta(meta);

        //console.log('graphs list: ', this.graphs.list);

        var graphKey = this.lazyGraphKeyFromName(this.input.name);
        console.log('updating graph using graph key: ', graphKey);
        var graphKeyEvent = graphKey;
        console.log('Sending graph Id event', graphKeyEvent);
        this._meta.appSubject.next(graphKeyEvent);
    }

    // Interface compliance
    ngOnInit(){
        var initMeta = this.loadGraphMeta();
        this.graphList = initMeta.list;

        //this.graphs = this._graphInfo.graphs;
        //this.graphs = {};
        //this.graphs.list =  this._initMeta.list || [];
        //this.input = this._graphInfo.input;
        this.input = {};
        this.input.name = initMeta.currentGraph || AppInputComponent.DEFAULT_GRAPH_NAME;
        this._graphInfo.setCurrentGraphName( this.input.name );
        //this.input.graphId = this.lazyGraphId(this.input.name, this.graphs.list);
        this.input.invalidNumber = false;
        //this.note = {};
        //this.note.nan = false;
        var self = this;

        this.graphInfoSubscription = this._graphInfo.graphSubject
            .subscribe(
                function(graphEvt) {
                    console.log('graphinfo evt key:', graphEvt);
                    self.updateGraph(graphEvt.currentGraphName);
                },
                function(error) { console.error('Error getting evt from graphinfo: ', error)},
                function() { console.log('graphInfo subscription completed')}
            );
        setTimeout( function(){ self.updateGraph(self.input.name); } );
    }
}
