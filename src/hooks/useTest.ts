import test from '../data/fifth.4.json';

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

const useTest = (): Test => {
  return test;
}

export default useTest;