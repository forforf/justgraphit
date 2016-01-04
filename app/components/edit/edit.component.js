System.register(['angular2/core', 'app/services/store/store.service', 'app/services/graph-info/graph-info.service', 'moment'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, store_service_1, graph_info_service_1, moment_;
    var moment, AppEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (graph_info_service_1_1) {
                graph_info_service_1 = graph_info_service_1_1;
            },
            function (moment_1) {
                moment_ = moment_1;
            }],
        execute: function() {
            // under systemjs, moment is actually exported as the default export, so we account for that
            //noinspection TypeScriptUnresolvedVariable
            moment = moment_['default'] || moment_;
            AppEditComponent = (function () {
                // Most services are provided through the main app
                function AppEditComponent(
                    //private _meta: AppMetadataService,
                    _graphInfo, _store) {
                    this._graphInfo = _graphInfo;
                    this._store = _store;
                    //public input;
                    this.graphData = [];
                }
                AppEditComponent.prototype.localTime = function (datetime) {
                    //noinspection TypeScriptValidateTypes
                    return moment(datetime).format('llll');
                };
                AppEditComponent.prototype.ago = function (datetime) {
                    //noinspection TypeScriptValidateTypes
                    return moment(datetime).fromNow();
                };
                AppEditComponent.prototype.saveGraphData = function () {
                    var graphKey = this._graphInfo.graphNameToKey(this.graphName);
                    this._store.save(graphKey, this.graphData);
                };
                AppEditComponent.prototype.clearGraphData = function () {
                    var graphKey = this._graphInfo.graphNameToKey(this.graphName);
                    this._store.save(graphKey, []);
                };
                AppEditComponent.prototype.removeGraphItem = function (itemId) {
                    alert('Not implemented yet');
                };
                //setAppId() {
                //    this.appId = this._app.appId;
                //    this.appId = this.appId || 'appId-not-set';
                //}
                //
                //updateGraphData(storageId) {
                //    this.graphData = this._store.getVal(storageId);
                //}
                AppEditComponent.prototype.ngOnInit = function () {
                    var meta = this._graphInfo.loadGraphMeta(null);
                    this.graphName = meta.currentGraph;
                    this.graphKey = this._graphInfo.graphNameToKey(this.graphName);
                    this.graphData = this._store.getVal(this.graphKey);
                    this.okToClear = true;
                };
                AppEditComponent = __decorate([
                    core_1.Component({
                        selector: 'edit',
                        templateUrl: 'app/templates/edit.html'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof graph_info_service_1.GraphInfoService !== 'undefined' && graph_info_service_1.GraphInfoService) === 'function' && _a) || Object, (typeof (_b = typeof store_service_1.StoreService !== 'undefined' && store_service_1.StoreService) === 'function' && _b) || Object])
                ], AppEditComponent);
                return AppEditComponent;
                var _a, _b;
            })();
            exports_1("AppEditComponent", AppEditComponent);
        }
    }
});
//# sourceMappingURL=edit.component.js.map