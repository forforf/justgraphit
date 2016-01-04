System.register(['angular2/core', 'app/services/faq/faq.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, faq_service_1;
    var AppAboutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (faq_service_1_1) {
                faq_service_1 = faq_service_1_1;
            }],
        execute: function() {
            AppAboutComponent = (function () {
                function AppAboutComponent(_faqs) {
                    this._faqs = _faqs;
                }
                AppAboutComponent.prototype.getFaqs = function () {
                    this.faqs = this._faqs.getFaqs();
                };
                AppAboutComponent.prototype.ngOnInit = function () {
                    this.getFaqs();
                };
                AppAboutComponent = __decorate([
                    core_1.Component({
                        selector: 'about',
                        templateUrl: 'app/templates/about.html',
                        providers: [faq_service_1.FaqService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof faq_service_1.FaqService !== 'undefined' && faq_service_1.FaqService) === 'function' && _a) || Object])
                ], AppAboutComponent);
                return AppAboutComponent;
                var _a;
            })();
            exports_1("AppAboutComponent", AppAboutComponent);
        }
    }
});
//# sourceMappingURL=about.component.js.map