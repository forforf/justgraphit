
class History {

  constructor(maxLen) {
    this._q = [];
    this.maxLen = maxLen;
  }
  
  getAll = () => {
    return this._q;
  };

  getLast = () => {
    return this._q[0];
  };
  
  push = (item) => {
    if (this._q.length >= this.maxLen) {
      this._q.shift();
    }
    this._q.push(item);
  };
}

export default History;
