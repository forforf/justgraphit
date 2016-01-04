import {bootstrap}        from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router'

import {AppComponent}     from 'app/app.component'

bootstrap(AppComponent, [
    ROUTER_PROVIDERS
]);

//(function(app) {
//    document.addEventListener('DOMContentLoaded', function() {
//        ng.platform.browser.bootstrap(app.AppComponent);
//    });
//})(window.app || (window.app = {}));