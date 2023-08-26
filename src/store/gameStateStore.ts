import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { Word } from "./wordListsStore";
import { pronounce } from "../utils/say";

//TODO SETTINGS
const maxCharacters = 10;

class GameStateStore {
  root: RootStore;
  wordId: number | null = null;
  isSubmitting: boolean = false;
  isSpeaking: boolean = false;
  isError: boolean = false;
  answer: string = '';

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);

    this.reset();
  }

  reset() {
    this.answer = '';
  }

  setCurrentWord(wordId: number | null): void {
    this.wordId = wordId;
  }

  addLetterToAnswer(character: string): void {
    if (this.isSubmitting) return;
    if (!character.match(/^[A-Z]$/i)) throw 'Invalid character';
    this.isError = false;

    if (this.answer.length >= maxCharacters) return;

    this.answer += character.toUpperCase();
  };

  removeLetterFromAnswer(): void {
    if (this.isSubmitting) return;
    this.isError = false;

    if (this.answer.length) {
      this.answer = this.answer.substring(0, this.answer.length - 1)
    }
  };

  get currentWord(): Word | undefined {
    return this.root.wordListStore.getWord(this.wordId ?? -1);
  }


  async submit(): Promise<void> {
    const word = this.currentWord;
    if (!word) return;

    this.isSubmitting = true;

    if (word.spelling === this.answer) {
      await this.root.speechStore.say('--' + pronounce(word.pronunciation ?? word.spelling) + ' --- ' + (word.pronunciation ?? word.spelling))
      this.reset();
      this.isError = false;
      // this.showAnswer = false;

      this.wordId = this.wordId !== null ? this.wordId + 1 : 0;
    } else {
      this.isError = true;
      this.root.speechStore.say(word.pronunciation ?? word.spelling)
    }
    this.isSubmitting = false;
  }
}

export default GameStateStore;
