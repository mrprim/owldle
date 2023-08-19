import { atom, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { MAX_CHARACTERS } from "./data/settings";
import { errorStateAtom } from "./useSubmit";

type AnswerActions = {
  addLetter: (character: string) => void,
  removeLetter: () => void;
  clear: () => void;
}

const answerAtom = atom('');

const useAnswerActions = (): AnswerActions => {
  const setValue = useSetAtom(answerAtom);
  const setErrorState = useSetAtom(errorStateAtom);

  const addLetter = useCallback((character: string): void => {
    if(!character.match(/^[A-Z]$/i)) throw 'Invalid character';
    setErrorState(false);
    setValue((v) => {
      if(v.length >= MAX_CHARACTERS) return v;
      return v + character.toUpperCase();
    });
  }, [setErrorState, setValue]);

  const removeLetter = useCallback(() => {
    setErrorState(false);
    setValue((v) =>  v.length ? v.substring(0,v.length-1) : v);
  }, [setErrorState, setValue]);

  const clear = useCallback(() => {
    setErrorState(false);
    setValue('');
  }, [setErrorState, setValue]);

  return useMemo(() => ({
    addLetter,
    removeLetter,
    clear
  }), [addLetter, removeLetter])
}

export { answerAtom };
export default useAnswerActions;