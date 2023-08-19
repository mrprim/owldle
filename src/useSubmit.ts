import { atom, useAtomValue, useSetAtom } from "jotai";
import useAnswerActions, { answerAtom } from "./useAnswerActions";
import useCurrentQuestion, { currentQuestionIdAtom } from "./useCurrentQuestion";
import { useCallback } from "react";

type SubmitFunction = () => void;

const errorStateAtom = atom(false);

const useSubmit = (): SubmitFunction => {
  const setErrorState = useSetAtom(errorStateAtom);

  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);
  const { question } = useCurrentQuestion();
  const { clear } = useAnswerActions();
  const answer = useAtomValue(answerAtom);

  return useCallback(() => {
    if(question === answer) {
      clear();
      setCurrentQuestion((id) => id + 1);
      setErrorState(false);
    } else {
      setErrorState(true);
    }
  }, [question, answer, clear, setCurrentQuestion])
}

export { errorStateAtom }
export default useSubmit;