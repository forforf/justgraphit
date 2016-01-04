// Porting Issues
// iterating over objects ng-repeat/ ngFor no longer works (only arrays)
// Importing legacy 3rd Pary libraries is convoluted (momentjs)
System.register(['angular2/core', 'angular2/router', 'app/components/about/about.component', 'app/components/edit/edit.component', 'app/components/input/input.component', 'app/services/app-metadata/app-metadata.service', 'app/services/browser-storage/browser-storage.service', 'app/services/store/store.service', 'app/services/graph-info/graph-info.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, about_component_1, edit_component_1, input_component_1, app_metadata_service_1, browser_storage_service_1, store_service_1, graph_info_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (edit_component_1_1) {
                edit_component_1 = edit_component_1_1;
            },
            function (input_component_1_1) {
                input_component_1 = input_component_1_1;
            },
            function (app_metadata_service_1_1) {
                app_metadata_service_1 = app_metadata_service_1_1;
            },
            function (browser_storage_service_1_1) {
                browser_storage_service_1 = browser_storage_service_1_1;
            },
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (graph_info_service_1_1) {
                graph_info_service_1 = graph_info_service_1_1;
            }],
        execute: function() {
            //Be Careful. if I used ['Input'] I got a conflict with the <input> tab
            AppComponent = (function () {
                function AppComponent(_appMetadata, _graphInfo, _localStorage) {
                    this._appMetadata = _appMetadata;
                    this._graphInfo = _graphInfo;
                    this._localStorage = _localStorage;
                }
                //setAppId(_appId) {
                //    this._appMetadata.appId = _appId;
                //    this.test = this._appMetadata.appId;
                //}
                AppComponent.prototype.setStorageId = function (appId) {
                    var prefix = '' + appId + '-' + this._graphInfo.encodeHost();
                    this._localStorage.setPrefix(prefix);
                };
                // Interface implementations
                AppComponent.prototype.ngOnInit = function () {
                    this._appMetadata.appId = "jgi";
                    this._appMetadata.graphsListKey = "all-graphs";
                    this.setStorageId(this._appMetadata.appId);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"navbar navbar-inverse navbar-fixed-top\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" href=\"#\">Just Graph It</a>\n                </div>\n                <div class=\"collapse navbar-collapse\">\n                    <ul class=\"nav navbar-nav\">\n                        <li><a [routerLink]=\"['AppInput']\">Graph</a></li>\n                        <li><a [routerLink]=\"['Edit']\">Edit</a></li>\n                        <li><a [routerLink]=\"['About']\">About</a></li>\n                    </ul>\n                </div><!--/.nav-collapse -->\n            </div>\n        </div>\n        <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            app_metadata_service_1.AppMetadataService,
                            browser_storage_service_1.BrowserStorageService,
                            store_service_1.StoreService,
                            graph_info_service_1.GraphInfoService]
                    }),
                    router_1.RouteConfig([
                        { path: '/input', component: input_component_1.AppInputComponent, name: 'AppInput', useAsDefault: true },
                        { path: '/edit', component: edit_component_1.AppEditComponent, name: 'Edit' },
                        { path: '/about', component: about_component_1.AppAboutComponent, name: 'About' }
                    ]), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof app_metadata_service_1.AppMetadataService !== 'undefined' && app_metadata_service_1.AppMetadataService) === 'function' && _a) || Object, (typeof (_b = typeof graph_info_service_1.GraphInfoService !== 'undefined' && graph_info_service_1.GraphInfoService) === 'function' && _b) || Object, (typeof (_c = typeof store_service_1.StoreService !== 'undefined' && store_service_1.StoreService) === 'function' && _c) || Object])
                ], AppComponent);
                return AppComponent;
                var _a, _b, _c;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
// Issues
// delete button on Edit window is not aligned
// Clearing a graph doesn't clear the graph from the graph window.
//  -- The common edit functions between the graph and edit window should go into graphInfo
//# sourceMappingURL=app.component.js.map