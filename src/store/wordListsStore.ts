import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

const pages = import.meta.glob('../data/*.json')

const CURRENT_WEEK = 4;
const CURRENT_GRADE = 5;

type Word = {
  spelling: string;
  pronunciation?: string;
}

type WordList = {
  grade: number;
  week: number;
  rule: string;
  subrule?: string;
  advice: string;
  words: Word[];
}

class WordListsStore {
  root: RootStore;
  tests = [] as WordList[];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);

    this.init();
  }

  async init() {
    const promises = Object.values(pages).map(async (importer) => {
      const test = await importer();

      this.tests.push((test as any).default as WordList);
    });

    await Promise.all(promises);
  }

  getTest() {
    return this.tests.find((t) => t.week === CURRENT_WEEK && t.grade === CURRENT_GRADE)
  }

  getWord(wordId: number) {
    return this.getTest()?.words?.[wordId];
  }
}

export type { Word, WordList }
export default WordListsStore;
