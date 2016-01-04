System.register(['angular2/core', 'rxjs/Rx', 'app/services/store/store.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, store_service_1;
    var GraphInfoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            }],
        execute: function() {
            GraphInfoService = (function () {
                function GraphInfoService(_store) {
                    this._store = _store;
                    this.graphSubject = new Rx_1.Subject();
                    this._graphMetaKey = "all-graphs";
                }
                // getter/setters
                GraphInfoService.prototype.getCurrentGraphName = function () {
                    return this._meta.currentGraph;
                };
                // called before ngOnit?
                GraphInfoService.prototype.setCurrentGraphName = function (graphName) {
                    this._meta = this._meta || this.loadGraphMeta(this._graphMetaKey) || {};
                    this._meta.currentGraph = graphName;
                    // Send update to all subscribers that the currentGraphName has changed,
                    // and for convenience will send the ID too
                    var evt = {
                        currentGraphName: this.getCurrentGraphName(),
                        currentGraphKey: this.graphNameToKey(this.getCurrentGraphName())
                    };
                    this.graphSubject.next(evt);
                    return this.getCurrentGraphName();
                };
                GraphInfoService.prototype.getGraphMetaKey = function () {
                    return this._graphMetaKey;
                };
                GraphInfoService.prototype.setGraphMetaKey = function (listKey) {
                    this._graphMetaKey = listKey;
                    // ToDo: Update the localStorage to reflect the new key.
                };
                // loaders/savers
                GraphInfoService.prototype.loadGraphData = function (graphKey) {
                    return this._store.getVal(graphKey);
                };
                GraphInfoService.prototype.saveGraphData = function (graphKey, graphData) {
                    this._store.save(graphKey, graphData);
                };
                GraphInfoService.prototype.loadGraphMeta = function (graphMetaKey) {
                    graphMetaKey = graphMetaKey || this._graphMetaKey;
                    console.log('getting graphMeta with :', graphMetaKey, this._graphMetaKey);
                    var meta = this._store.getVal(graphMetaKey);
                    if (meta === null || meta === undefined) {
                        meta = {};
                    }
                    if (meta.list === null || meta.list === undefined) {
                        meta.list = [];
                    }
                    return meta;
                };
                GraphInfoService.prototype.saveGraphMeta = function (meta) {
                    console.log('saving key, meta', this.getGraphMetaKey(), meta);
                    this._store.save(this.getGraphMetaKey(), meta);
                };
                // Instance Methods
                //ToDo: Type graphEntry (see input.compoent.ts)
                GraphInfoService.prototype.appendGraphData = function (graphKey, graphEntry) {
                    this._store.append(graphKey, graphEntry);
                };
                GraphInfoService.prototype.encodeHost = function () {
                    var host = window.location.host;
                    return this._encode(host);
                };
                GraphInfoService.prototype.graphNameToKey = function (name) {
                    return (name) ? this._encode(name) : null;
                };
                GraphInfoService.prototype.removeGraph = function (graphName) {
                    console.log('GraphInfo Deleting graph name: ', graphName);
                    // remove graph data
                    this._store.clear(this.graphNameToKey(graphName));
                    var meta = this.loadGraphMeta(null);
                    // remove graph from list
                    console.log('index: ', meta.list.indexOf(graphName));
                    var index = meta.list.indexOf(graphName);
                    if (index > -1) {
                        meta.list.splice(index, 1);
                        console.log('meta list after graphName deleted:', meta.list);
                        // remove graph as currentGraph (if it's current Graph)
                        if (meta.currentGraph === graphName) {
                            meta.currentGraph = meta.list[0];
                            this.setCurrentGraphName(meta.currentGraph);
                        }
                        this.saveGraphMeta(meta);
                        console.log('saved meta:', this.loadGraphMeta(null));
                    }
                };
                // pseudo-private
                GraphInfoService.prototype._encode = function (s) {
                    return btoa.call(window, s);
                };
                // Interfaces
                GraphInfoService.prototype.ngOnInit = function () {
                    this._meta = this.loadGraphMeta(this._graphMetaKey);
                    this._meta.currentGraph = "not set";
                    //this._graphMetaKey = "all-graphs";
                    //console.log('graphInfo-init graphMetaKey: ', this._graphMetaKey);
                };
                GraphInfoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof store_service_1.StoreService !== 'undefined' && store_service_1.StoreService) === 'function' && _a) || Object])
                ], GraphInfoService);
                return GraphInfoService;
                var _a;
            })();
            exports_1("GraphInfoService", GraphInfoService);
        }
    }
});
//# sourceMappingURL=graph-info.service.js.map