import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

const pages = import.meta.glob('../data/*.json')

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
  wordLists = [] as WordList[];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);

    this.init();
  }

  async init() {
    const promises = Object.values(pages).map(async (importer) => {
      const test = await importer();

      this.wordLists.push((test as any).default as WordList);
    });

    await Promise.all(promises);
  }
}

export type { Word, WordList }
export default WordListsStore;
