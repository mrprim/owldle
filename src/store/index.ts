import { makeAutoObservable } from "mobx";

const pages = import.meta.glob('../data/*.json')

const CURRENT_WEEK = 4;
const CURRENT_GRADE = 5;

type Word = {
  spelling: string;
  pronunciation?: string;
}

type Test = {
  grade: number;
  week: number;
  rule: string;
  subrule?: string;
  advice: string;
  words: Word[];
}

class Store {
  currentQuestionId = null as null | number;
  tests = [] as Test[];

  constructor() {
    makeAutoObservable(this);
  }
  add(test: Test) {
    this.tests.push(test);
  }
  getTest() {
    return this.tests.find((t) => t.week === CURRENT_WEEK && t.grade === CURRENT_GRADE)
  }
  getQuestion(question: number) {
    return this.getTest()?.words?.[question];
  }
  setCurrentQuestion(questionId: number | null) {
    this.currentQuestionId = questionId;
  }
}

const store = new Store();

const init = async () => {
  const promises = Object.values(pages).map(async (importer) => {
    const test = await importer();

    store.add((test as any).default as Test);
  });

  return Promise.all(promises);
}

init();

export type { Test }
export default store;
