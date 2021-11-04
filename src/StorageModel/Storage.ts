import IsEmpty from 'lodash.isempty';
import {
  GraphName,
  JustGraphitEntry,
  JustGraphitStore,
} from '../JustGraphitTypes';

// ToDo Needs testing:
// It's just an thin abstraction layer above a persistent store (local storage in this case)
// and should not have any JustGraphit dependencies
class LocalStorageWrapper {
  mainKey: string;

  constructor(mainKey = '__justgraphit__') {
    this.mainKey = mainKey;
  }

  load = () => {
    return JSON.parse(localStorage.getItem(this.mainKey) ?? '{}');
  };

  // We are saving an entire JSON object using mainKey
  // The saved JSON object should have keys of it's own to be
  // meaningful in this context.
  save = (value: unknown) => {
    localStorage.setItem(this.mainKey, JSON.stringify(value));
  };
}

class Storage {
  persistentStore: LocalStorageWrapper;
  store: JustGraphitStore;

  constructor(initialObj: JustGraphitStore) {
    const initialObject: JustGraphitStore = IsEmpty(initialObj)
      ? {}
      : initialObj;
    this.persistentStore = new LocalStorageWrapper();
    this.store = this.persistentStore.load();
    if (this.isEmpty()) {
      this.persistentStore.save(initialObject);
      this.store = this.persistentStore.load();
    }
  }

  deleteObject = (key: string): boolean => {
    const deleteRetVal = delete this.store[key] ?? '';
    if (deleteRetVal) {
      this.updatePersistence();
    }
    return deleteRetVal;
  };

  getAll = (): JustGraphitStore => this.store;

  getAllKeys = (): GraphName[] => Object.keys(this.getAll());

  getInitialKey = (): GraphName => Object.keys(this.store)[0];

  getInitialObject = (): Record<GraphName, JustGraphitEntry[]> => {
    return { [this.getInitialKey()]: this.store[this.getInitialKey()] };
  };

  isEmpty = (): boolean => IsEmpty(this.store);

  load = (key: string): JustGraphitEntry[] => this.store[key];

  save = (key: GraphName, val: JustGraphitEntry[]): GraphName => {
    this.store[key] = val;
    this.updatePersistence();
    return key;
  };

  updatePersistence = (): void => {
    this.persistentStore.save(this.store);
  };
}

export default Storage;
