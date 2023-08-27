import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import say, { UtteranceMutator } from "../utils/say";

class SpeechStore {
  root: RootStore;
  isSpeaking: boolean = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }


  async say(text: string, mutator?: UtteranceMutator): Promise<void> {
    this.isSpeaking = true;
    await say(text, mutator);
    this.isSpeaking = false;
  }
}

export default SpeechStore;
