// Porting Issues
// iterating over objects ng-repeat/ ngFor no longer works (only arrays)
// Importing legacy 3rd Pary libraries is convoluted (momentjs)

import {Component, OnInit}         from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {AppAboutComponent} from 'app/components/about/about.component'
import {AppEditComponent}  from 'app/components/edit/edit.component'
import {AppInputComponent}  from 'app/components/input/input.component'

// Application Providers: ToDo: Use StoreService to completely abstract BrowserStorageService (how to do this?)
import {AppMetadataService} from 'app/services/app-metadata/app-metadata.service'
import {BrowserStorageService} from 'app/services/browser-storage/browser-storage.service'
import {StoreService} from 'app/services/store/store.service'
import {GraphInfoService} from 'app/services/graph-info/graph-info.service'

//Be Careful. if I used ['Input'] I got a conflict with the <input> tab

@Component({
    selector: 'my-app',
    template: `
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Just Graph It</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['AppInput']">Graph</a></li>
                        <li><a [routerLink]="['Edit']">Edit</a></li>
                        <li><a [routerLink]="['About']">About</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        AppMetadataService,
        BrowserStorageService,
        StoreService,
        GraphInfoService]
})

@RouteConfig([
    { path: '/input', component: AppInputComponent, name: 'AppInput', useAsDefault: true },
    { path: '/edit',  component: AppEditComponent,  name: 'Edit' },
    { path: '/about', component: AppAboutComponent, name: 'About' }
])

export class AppComponent implements OnInit {
    public test: string;

    constructor(
        private _appMetadata: AppMetadataService,
        private _graphInfo: GraphInfoService,
        private _localStorage: StoreService
    ){}


    //setAppId(_appId) {
    //    this._appMetadata.appId = _appId;
    //    this.test = this._appMetadata.appId;
    //}

    setStorageId(appId) {
        var prefix = '' + appId + '-' + this._graphInfo.encodeHost();
        this._localStorage.setPrefix(prefix);
    }

    // Interface implementations

    ngOnInit() {
        this._appMetadata.appId = "jgi";
        this._appMetadata.graphsListKey = "all-graphs";
        this.setStorageId(this._appMetadata.appId);
    }
}

// Issues
// delete button on Edit window is not aligned
// Clearing a graph doesn't clear the graph from the graph window.
//  -- The common edit functions between the graph and edit window should go into graphInfo

