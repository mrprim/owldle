import { atom, useAtomValue, useSetAtom } from "jotai";
import useAnswerActions, { answerAtom } from "./useAnswerActions";
import useCurrentQuestion, { currentQuestionIdAtom } from "./useCurrentQuestion";
import { useCallback } from "react";
import useShowAnswer from "./useShowAnswer";
import useSpeech from "./useSpeech";

type SubmitFunction = () => void;

const isSubmittingAtom = atom(false);
const errorStateAtom = atom(false);

const pronounce = (word: string): string => [...word].map((c) => c === 'A' ? 'EH' : c).join(' -- ');

const useSubmit = (): SubmitFunction => {
  const { say } = useSpeech();
  const setErrorState = useSetAtom(errorStateAtom);
  const [_, setShowAnswer] = useShowAnswer();

  const setCurrentQuestion = useSetAtom(currentQuestionIdAtom);
  const setIsSubmitting = useSetAtom(isSubmittingAtom);
  const { question } = useCurrentQuestion();
  const { clear } = useAnswerActions();
  const answer = useAtomValue(answerAtom);

  return useCallback(async () => {
    setIsSubmitting(true);
    if (question.spelling === answer) {
      await say('--' + pronounce(question.pronunciation ?? question.spelling) + ' --- ' + (question.pronunciation ?? question.spelling))

      clear();
      setErrorState(false);
      setShowAnswer(false);
      setCurrentQuestion((id) => id !== null ? id + 1 : 0);
    } else {
      setErrorState(true);
      say(question.pronunciation ?? question.spelling)
    }
    setIsSubmitting(false);
  }, [question, answer, clear, setCurrentQuestion])
}

export { errorStateAtom, isSubmittingAtom }
export default useSubmit;