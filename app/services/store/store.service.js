System.register(['angular2/core', 'app/services/browser-storage/browser-storage.service', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_storage_service_1, Rx_1;
    var StoreService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_storage_service_1_1) {
                browser_storage_service_1 = browser_storage_service_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            // Abstracts the details of the actual storage details from the app
            // One key thing is it adds/strips a unique prefix from the local-storage key
            StoreService = (function () {
                function StoreService(_browserStorage) {
                    this._browserStorage = _browserStorage;
                    this.onSaveSubject = new Rx_1.Subject();
                    this._prefix = "local-storage-prefix-"; //default prefix
                    this._sep = '-';
                }
                // getter/setters
                StoreService.prototype.getPrefix = function () {
                    var internalPrefix = this._prefix;
                    // strips internal separator from prefix
                    var pos = internalPrefix.lastIndexOf(this._sep);
                    return internalPrefix.substring(0, pos);
                };
                // adds internal separator to prefix
                StoreService.prototype.setPrefix = function (prefix) {
                    this._prefix = '' + prefix + this._sep;
                };
                StoreService.prototype.append = function (key, value) {
                    var updateValue = this.getVal(key) || [];
                    // updateValue should be an array. We're going to blow away anything that's there that isn't an array
                    // For example if something else was stored there as an object or non-array
                    if (!Array.isArray(updateValue)) {
                        updateValue = [];
                    }
                    updateValue.push(value);
                    this.save(key, updateValue);
                };
                StoreService.prototype.clear = function (appKey) {
                    var storageKey = this._wrapKey(appKey);
                    this._browserStorage.removeItem(storageKey);
                };
                ;
                // I don't think this method is used
                StoreService.prototype.getAllKeys = function () {
                    var matcher = RegExp(this._prefix);
                    var keys = [];
                    for (var key in this._browserStorage) {
                        if (key.match(matcher)) {
                            keys.push(this.unwrapKey(key));
                        }
                    }
                    return keys;
                };
                StoreService.prototype.decodeTest = function (s) {
                    var retVal = null;
                    console.log('decoding');
                    try {
                        retVal = atob(s);
                    }
                    catch (e) {
                        retVal = "unable to decode";
                    }
                    console.log('decoding');
                    return retVal;
                };
                StoreService.prototype.getVal = function (appKey) {
                    var storageKey = this._wrapKey(appKey);
                    console.log('StoreService getVal using key:', storageKey);
                    console.log('decoded key:', this.decodeTest(storageKey));
                    var str = this._browserStorage.getItem(storageKey);
                    console.debug('StoreService getVal, storage data:', str);
                    return JSON.parse(str);
                };
                StoreService.prototype.save = function (key, value) {
                    console.log('store saving: ', key, value);
                    if (key == null) {
                        return;
                    }
                    ; //Don't create record with invalid key
                    var wrappedKey = this._wrapKey(key);
                    console.log('full key', wrappedKey);
                    this._browserStorage.setItem(wrappedKey, JSON.stringify(value));
                    console.log('full value', JSON.stringify(value));
                    //create stream and merge with saveSource
                    this.onSaveSubject.next(key);
                };
                StoreService.prototype.unwrapKey = function (storageKey) {
                    return storageKey.replace(this._prefix, '');
                };
                // Psuedo-private methods
                StoreService.prototype._wrapKey = function (appKey) {
                    return '' + this._prefix + appKey;
                };
                StoreService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof browser_storage_service_1.BrowserStorageService !== 'undefined' && browser_storage_service_1.BrowserStorageService) === 'function' && _a) || Object])
                ], StoreService);
                return StoreService;
                var _a;
            })();
            exports_1("StoreService", StoreService);
        }
    }
});
//# sourceMappingURL=store.service.js.map