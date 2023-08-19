import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import useQuestions from './useQuestions';

const currentQuestionIdAtom = atom(0);

const useCurrentQuestion = () => {
  const [id] = useAtom(currentQuestionIdAtom);
  const questions = useQuestions();

  return useMemo(() => ({
    id,
    question: questions[id],
  }), [id])
}

export { currentQuestionIdAtom };
export default useCurrentQuestion;