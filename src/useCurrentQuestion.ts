import { atom, useAtom } from 'jotai';
import questions from './data/words.json';
import { useMemo } from 'react';

const currentQuestionIdAtom = atom(0);

const useCurrentQuestion = () => {
  const [ id ] = useAtom(currentQuestionIdAtom);

  return useMemo(() => ({
    id,
    question: questions[id],
  }), [id])
}

export { currentQuestionIdAtom };
export default useCurrentQuestion;