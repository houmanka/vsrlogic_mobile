export class TransfereService {

  constructor(
  ) { }

  private data;

  setData(data) {
    this.data = data;
  }

  getData() {
    const temp = this.data;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }

}
