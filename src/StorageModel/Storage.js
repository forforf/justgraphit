import IsEmpty from 'lodash.isempty';
import History from './History';


// ToDo Needs testing
class LocalStorageWrapper {
  constructor(mainKey='__justgraphit__') {
    this.mainKey = mainKey;
  }

  load = () => {
    return JSON.parse(localStorage.getItem(this.mainKey));
  };

  save = (value) =>  {
    localStorage.setItem(this.mainKey, JSON.stringify(value));
  };
}

class Storage {

  constructor(initialObj) {
    const initialObject = IsEmpty(initialObj) ? {} : initialObj;
    this.persistentStore = new LocalStorageWrapper();
    this.store = this.persistentStore.load();
    if (this.isEmpty()) {
      this.persistentStore.save(initialObject);
      this.store = this.persistentStore.load();
    }
    this.history = new History(2);
  }

  deleteObject = key => {
    const deleteRetVal = (delete this.store[key]);
    if (deleteRetVal) {
      this.updatePersistence();
    }
    return deleteRetVal;
  }
  
  getAll= () => this.store;

  getAllKeys = () => Object.keys(this.getAll());

  getInitialKey = () => Object.keys(this.store)[0];
  
  getLastKey = () => ( this.history.getLast() || this.getInitialKey() );

  // returns last object from history
  getLastStorageObject = () => {
    let obj = {};
    const key = this.getLastKey();
    obj[key] = this.load(key);
    return obj;
  };
  
  isEmpty = () => IsEmpty(this.store);

  load = key =>  this.store[key];

  save = (key, val) => {
    this.updateHistory(key);
    this.store[key] = val;
    this.updatePersistence();
    return key;
  };

  updateHistory = key => {
    if (key && key.length) {
      this.history.push(key);
    }
  }

  updatePersistence = () => {
    this.persistentStore.save(this.store);
  }
}

export default Storage;
