export default class Tab {
  constructor() {
    this.active = null;
    this.tabs = [];
  }

  add(tab) {
    this.tabs.push(tab);
  }

  getActive() {
    return this.active;
  }

  setActive(tab) {
    this.active = tab;
  }
}
