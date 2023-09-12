import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { Word, WordList } from "./wordListsStore";
import { pronounce } from "../utils/say";

const DEFAULT_GRADE = 5;
const DEFAULT_WEEK = 5;

class GameStateStore {
  root: RootStore;
  grade: number | null = DEFAULT_GRADE;
  week: number | null = DEFAULT_WEEK;
  wordId: number | null = null;
  isSubmitting: boolean = false;
  isError: boolean = false;
  isAnswerShowing: boolean = false;
  answer: string = '';
  maxCharacters: number = 11;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  reset() {
    this.answer = '';
  }

  get wordList(): WordList | undefined {
    return this.root.wordListStore.wordLists.find((wl) => wl.week === this.week && wl.grade === this.grade);
  }

  get word(): Word | undefined {
    return this.wordList?.words?.[this.wordId ?? -1];
  }

  setCurrentWord(wordId: number | null): void {
    this.wordId = wordId;
  }

  addLetterToAnswer(character: string): void {
    if (this.isSubmitting) return;
    if (!character.match(/^[A-Z]$/i)) throw 'Invalid character';
    this.isError = false;

    if (this.answer.length >= this.maxCharacters) return;

    this.answer += character.toUpperCase();
  };

  removeLetterFromAnswer(): void {
    if (this.isSubmitting) return;
    this.isError = false;

    if (this.answer.length) {
      this.answer = this.answer.substring(0, this.answer.length - 1)
    }
  };

  setShowAnswer(v: boolean): void {
    this.isAnswerShowing = v;
  }


  async submit(): Promise<void> {
    const word = this.word;
    if (!word) return;
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    if (word.spelling === this.answer) {
      await this.root.speechStore.say('--' + pronounce(word.pronunciation ?? word.spelling) + ' --- ' + (word.pronunciation ?? word.spelling))
      this.reset();
      this.isError = false;
      this.isAnswerShowing = false;

      this.wordId = this.wordId !== null ? this.wordId + 1 : 0;
    } else {
      this.isError = true;
      this.root.speechStore.say(word.pronunciation ?? word.spelling)
    }
    this.isSubmitting = false;
  }
}

export default GameStateStore;
