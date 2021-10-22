
class GraphObject {

  static fromPlainObject(obj) {
    const ks = Object.keys(obj);
    if (ks.length > 1) {
      throw new Error(`Only single keyed object supported, but got ${ks}`)
    }
    const name = Object.keys(obj)[0];
    const data = obj[name];
    return new GraphObject(name, data);
  }

  constructor(graphName, graphData) {
    this.name = graphName;
    this.data = graphData;
  }
}

export default GraphObject