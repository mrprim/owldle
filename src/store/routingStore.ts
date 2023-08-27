import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

type Screen = 'home' | 'settings' | 'review'
class RoutingStore {
  root: RootStore;
  screen: Screen = 'home';

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  setScreen(screen: Screen): void {
    this.screen = this.screen === screen ? 'home' : screen;
  }
}

export default RoutingStore;
