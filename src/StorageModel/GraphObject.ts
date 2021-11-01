import {GraphName, JustGraphitEntry, JustGraphitStore} from "../JustGraphitTypes";


// Used to enforce that there is a single key/value pair (key = name, value = data in this case)
class GraphObject {
  name: GraphName;
  data: JustGraphitEntry[];

  // input object should look like a store, but actually only have a single graph -> data entry
  static fromPlainObject(obj: JustGraphitStore): GraphObject {
    const ks = Object.keys(obj);
    if (ks.length > 1) {
      throw new Error(`Only single keyed object supported, but got ${ks}`)
    }
    const name = Object.keys(obj)[0];
    const data = obj[name];
    return new GraphObject(name, data);
  }

  constructor(graphName: GraphName, graphData: JustGraphitEntry[]) {
    this.name = graphName;
    this.data = graphData;
  }
}

export default GraphObject;