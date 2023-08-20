import { atom, useAtom } from "jotai";

const showAnswerAtom = atom(false);

const useShowAnswer = () => {
  return useAtom(showAnswerAtom);
}

export default useShowAnswer