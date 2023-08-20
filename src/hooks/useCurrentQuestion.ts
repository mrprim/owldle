import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import useQuestions from './useQuestions';

const currentQuestionIdAtom = atom<number | null>(null);

const useCurrentQuestion = () => {
  const [id] = useAtom(currentQuestionIdAtom);
  const questions = useQuestions();

  return useMemo(() => ({
    id,
    question: questions[id ?? -1],
  }), [id])
}

export { currentQuestionIdAtom };
export default useCurrentQuestion;