System.register(['angular2/core', 'rxjs/Rx', 'app/services/app-metadata/app-metadata.service', 'app/services/graph-info/graph-info.service', 'app/components/line-graph/line-graph', 'moment'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, app_metadata_service_1, graph_info_service_1, line_graph_1, moment_;
    var moment, AppInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (app_metadata_service_1_1) {
                app_metadata_service_1 = app_metadata_service_1_1;
            },
            function (graph_info_service_1_1) {
                graph_info_service_1 = graph_info_service_1_1;
            },
            function (line_graph_1_1) {
                line_graph_1 = line_graph_1_1;
            },
            function (moment_1) {
                moment_ = moment_1;
            }],
        execute: function() {
            // under systemjs, moment is actually exported as the default export, so we account for that
            //noinspection TypeScriptUnresolvedVariable
            moment = moment_['default'] || moment_;
            //ToDo: Use Store abstraction not BrowserStorage
            AppInputComponent = (function () {
                // Most services are provided through the main app
                function AppInputComponent(_graphInfo, 
                    //private _store: StoreService,
                    _meta // This is different than GraphMeta
                    ) {
                    this._graphInfo = _graphInfo;
                    this._meta = _meta;
                    this.onGraphNameClick = new Rx_1.Subject();
                    this._graphMetaKey = _graphInfo.getGraphMetaKey();
                    this.graphList = [];
                }
                // syntactic sugar
                AppInputComponent.prototype.graphNameToKey = function (name) {
                    return this._graphInfo.graphNameToKey(name);
                };
                AppInputComponent.prototype.loadGraphMeta = function () {
                    // will use currently set graphMetaKey
                    return this._graphInfo.loadGraphMeta(null);
                };
                AppInputComponent.prototype.saveGraphMeta = function (meta) {
                    this._graphInfo.saveGraphMeta(meta);
                };
                // Instance Methods
                AppInputComponent.prototype.addCurrentGraph = function (name) {
                    console.log('adding graph and empty data: ', name);
                    var graphKey = this.graphNameToKey(name);
                    this._graphInfo.saveGraphData(graphKey, []);
                    return graphKey;
                };
                AppInputComponent.prototype.addCurrentGraphNameToMeta = function (name) {
                    var meta = this.loadGraphMeta();
                    var index = meta.list.indexOf(name);
                    if (index === -1) {
                        meta.list.push(name);
                        this.graphList = meta.list;
                    }
                    meta.currentGraph = name;
                    this.saveGraphMeta(meta);
                };
                AppInputComponent.prototype.clear = function () {
                    alert('clear stub');
                };
                AppInputComponent.prototype.lazyGraphKeyFromName = function (name) {
                    console.log('lazyGraphKey from name:  ', name);
                    var graphKey = this.graphNameToKey(name);
                    console.log('getting graph data with key: ', graphKey);
                    var graphData = this._graphInfo.loadGraphData(graphKey);
                    console.log('graphKey, graphData', graphKey, graphData);
                    // return graphKey if it exists
                    if (graphData != null && graphData.length) {
                        return graphKey;
                    }
                    // else we create a new entry (metadata and graph)
                    this.addCurrentGraphNameToMeta(name);
                    var newGraphKey = this.addCurrentGraph(name);
                    return newGraphKey;
                };
                //getGraphIdFromNameInList(name, list) {
                //    var name = this.nameInList(name, list);
                //    return this.graphNameToKey(name);
                //}
                //nameInList(name, list){
                //    // if name is in list return name, else return null
                //    return (list.indexOf(name)>-1) ? name : null;
                //}
                AppInputComponent.prototype.removeGraph = function (graphName) {
                    var metaBefore = this.loadGraphMeta();
                    if (metaBefore.currentGraph === graphName) {
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
                };
                //graphMeta() {
                //    console.log('getting graphMeta with :', this._graphsListKey );
                //    var meta = this._store.getVal( this._graphsListKey );
                //    if(!meta){ meta = {}; }
                //    if(!meta.list){ meta.list=[] }
                //    return meta;
                //}
                AppInputComponent.prototype.save = function () {
                    // validate input
                    //this.note.nan = isNaN( parseFloat(this.input.number) );
                    this.input.invalidNumber = isNaN(this.input.number);
                    // ignore if we try to graph a non-number
                    if (this.input.invalidNumber) {
                        return this.input.invalidNumber;
                    }
                    //var graphKey = this.lazyGraphId(this.input.name, this.graphs.list);
                    var graphKey = this.lazyGraphKeyFromName(this.input.name);
                    //noinspection TypeScriptValidateTypes
                    this.input.datetime = moment();
                    //var key = this._store.makeGraphKey( this._browserStorage.prefix, id);
                    this._graphInfo.appendGraphData(graphKey, { number: this.input.number, datetime: this.input.datetime });
                    // clear number
                    this.input.number = null;
                    this.updateGraph(this.input.name);
                };
                AppInputComponent.prototype.test = function (event) {
                    console.log('test', event);
                };
                AppInputComponent.prototype.setCurrentName = function (name) {
                    this.input.name = name;
                    var graphKey = this.lazyGraphKeyFromName(this.input.name);
                    //this.input.graphId = this.lazyGraphId( this.input.name, this.graphs.list);
                    //var meta = { list: this.graphs.list, currentGraph: this.input.name };
                    this.addCurrentGraphNameToMeta(this.input.name);
                    this.focusTo = '#input-number';
                    console.log('Name set, updata Graph to: ', this.input.name);
                    this._graphInfo.setCurrentGraphName(this.input.name);
                    // setCurrentGraphName will trigger an event on graphSubject
                    // We should subscribe to that event to update the graph,
                    // rather than do it here
                    //this.updateGraph(this.input.name);
                    // reset so next change can retrigger focus
                    setTimeout(function () { this.focusTo = null; });
                };
                AppInputComponent.prototype.updateGraph = function (graphName) {
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
                };
                // Interface compliance
                AppInputComponent.prototype.ngOnInit = function () {
                    var initMeta = this.loadGraphMeta();
                    this.graphList = initMeta.list;
                    //this.graphs = this._graphInfo.graphs;
                    //this.graphs = {};
                    //this.graphs.list =  this._initMeta.list || [];
                    //this.input = this._graphInfo.input;
                    this.input = {};
                    this.input.name = initMeta.currentGraph || AppInputComponent.DEFAULT_GRAPH_NAME;
                    this._graphInfo.setCurrentGraphName(this.input.name);
                    //this.input.graphId = this.lazyGraphId(this.input.name, this.graphs.list);
                    this.input.invalidNumber = false;
                    //this.note = {};
                    //this.note.nan = false;
                    var self = this;
                    this.graphInfoSubscription = this._graphInfo.graphSubject
                        .subscribe(function (graphEvt) {
                        console.log('graphinfo evt key:', graphEvt);
                        self.updateGraph(graphEvt.currentGraphName);
                    }, function (error) { console.error('Error getting evt from graphinfo: ', error); }, function () { console.log('graphInfo subscription completed'); });
                    setTimeout(function () { self.updateGraph(self.input.name); });
                };
                AppInputComponent.DROPDOWN_VISIBILITY_TIMER = 3500;
                AppInputComponent.DEFAULT_GRAPH_NAME = 'my first graph';
                AppInputComponent = __decorate([
                    core_1.Component({
                        selector: 'app-input',
                        templateUrl: 'app/templates/input.html',
                        directives: [line_graph_1.AppLineGraphComponent]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof graph_info_service_1.GraphInfoService !== 'undefined' && graph_info_service_1.GraphInfoService) === 'function' && _a) || Object, (typeof (_b = typeof app_metadata_service_1.AppMetadataService !== 'undefined' && app_metadata_service_1.AppMetadataService) === 'function' && _b) || Object])
                ], AppInputComponent);
                return AppInputComponent;
                var _a, _b;
            })();
            exports_1("AppInputComponent", AppInputComponent);
        }
    }
});
//# sourceMappingURL=input.component.js.map