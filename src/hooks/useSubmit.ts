import { atom, useAtomValue, useSetAtom } from "jotai";
import useAnswerActions, { answerAtom } from "./useAnswerActions";
import useCurrentQuestion, { currentQuestionIdAtom } from "./useCurrentQuestion";
import { useCallback } from "react";

type SubmitFunction = () => void;

const isSubmittingAtom = atom(false);
const errorStateAtom = atom(false);

const pronounce = (word: string): string => [...word].join(' - ');

const useSubmit = (): SubmitFunction => {
  const setErrorState = useSetAtom(errorStateAtom);

  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);
  const setIsSubmitting = useSetAtom(isSubmittingAtom);
  const { question } = useCurrentQuestion();
  const { clear } = useAnswerActions();
  const answer = useAtomValue(answerAtom);

  return useCallback(async () => {
    setIsSubmitting(true);
    if (question === answer) {
      const msg = new SpeechSynthesisUtterance(pronounce(question) + ' --- ' + question)
      msg.rate = .65

      await new Promise(function (resolve) {
        msg.onend = resolve;
        window.speechSynthesis.speak(msg)
      });

      clear();
      setCurrentQuestion((id) => id + 1);
      setErrorState(false);
    } else {
      setErrorState(true);
    }
    setIsSubmitting(false);
  }, [question, answer, clear, setCurrentQuestion])
}

export { errorStateAtom, isSubmittingAtom }
export default useSubmit;