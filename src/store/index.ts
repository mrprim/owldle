import { makeAutoObservable } from "mobx";
import WordListsStore from "./wordListsStore";
import GameStateStore from "./gameStateStore";
import SpeechStore from "./speechStore";
import RoutingStore from "./routingStore";
import SettingsStore from "./settingsStore";

class RootStore {

  routingStore: RoutingStore;
  gameStateStore: GameStateStore;
  wordListStore: WordListsStore;
  speechStore: SpeechStore;
  settingsStore: SettingsStore;

  constructor() {
    makeAutoObservable(this);
    this.gameStateStore = new GameStateStore(this);
    this.wordListStore = new WordListsStore(this);
    this.speechStore = new SpeechStore(this);
    this.routingStore = new RoutingStore(this);
    this.settingsStore = new SettingsStore(this);
  }
}

const store = new RootStore();

export { RootStore }
export default store;
