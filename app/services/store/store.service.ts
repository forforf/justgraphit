import {Injectable} from 'angular2/core'
import {BrowserStorageService} from 'app/services/browser-storage/browser-storage.service'
import {Observable, Subject} from 'rxjs/Rx'

// Abstracts the details of the actual storage details from the app
// One key thing is it adds/strips a unique prefix from the local-storage key
@Injectable()
export class StoreService{

    // Notifier that we've saved data
    public onSaveSubject: Subject;
    private _prefix: string;
    private _sep: string;

    constructor(private _browserStorage: BrowserStorageService) {
        this.onSaveSubject = new Subject();
        this._prefix = "local-storage-prefix-"; //default prefix
        this._sep = '-';
    }

    // getter/setters

    getPrefix() {
        var internalPrefix = this._prefix;
        // strips internal separator from prefix
        var pos = internalPrefix.lastIndexOf(this._sep);
        return internalPrefix.substring(0,pos);
    }

    // adds internal separator to prefix
    setPrefix(prefix) {
        this._prefix = '' + prefix + this._sep;
    }

    append(key, value) {
        var updateValue = this.getVal(key) || [];

        // updateValue should be an array. We're going to blow away anything that's there that isn't an array
        // For example if something else was stored there as an object or non-array
        if( !Array.isArray(updateValue) ){ updateValue = []; }

        updateValue.push(value);
        this.save(key, updateValue);
    }

    clear(appKey) {
        var storageKey = this._wrapKey(appKey);
        this._browserStorage.removeItem(storageKey);
    };

    // I don't think this method is used
    getAllKeys() {
        var matcher = RegExp(this._prefix);
        var keys = [];
        for (var key in this._browserStorage ){
            if ( key.match(matcher) ) {
                keys.push( this.unwrapKey(key) );
            }
        }
        return keys;
    }

    decodeTest(s) {
        var retVal = null;
        console.log('decoding');
        try {
            retVal = atob(s);
        } catch(e) {
            retVal = "unable to decode"
        }
        console.log('decoding');
        return retVal
    }

    getVal(appKey) {
        var storageKey = this._wrapKey(appKey)
        console.log('StoreService getVal using key:', storageKey);
        console.log('decoded key:', this.decodeTest(storageKey));
        var str = this._browserStorage.getItem(storageKey);
        console.debug('StoreService getVal, storage data:', str);
        return JSON.parse(str);
    }

    save(key, value) {
        console.log('store saving: ', key, value);
        if (key == null){ return }; //Don't create record with invalid key
        var wrappedKey = this._wrapKey(key);
        console.log('full key', wrappedKey);
        this._browserStorage.setItem(wrappedKey, JSON.stringify(value));
        console.log('full value', JSON.stringify(value));
        //create stream and merge with saveSource
        this.onSaveSubject.next(key)
    }

    unwrapKey(storageKey) {
        return storageKey.replace(this._prefix, '');
    }
    // Psuedo-private methods

    _wrapKey(appKey) {
        return '' + this._prefix + appKey;
    }
}
