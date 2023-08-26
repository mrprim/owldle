import { makeAutoObservable } from "mobx";
import WordListsStore from "./wordListsStore";
import GameStateStore from "./gameStateStore";
import SpeechStore from "./speechStore";

class RootStore {

  gameStateStore: GameStateStore;
  wordListStore: WordListsStore;
  speechStore: SpeechStore;

  constructor() {
    makeAutoObservable(this);
    this.gameStateStore = new GameStateStore(this);
    this.wordListStore = new WordListsStore(this);
    this.speechStore = new SpeechStore(this);
  }
}

const store = new RootStore();

export { RootStore }
export default store;
