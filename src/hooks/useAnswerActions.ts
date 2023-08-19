import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { errorStateAtom, isSubmittingAtom } from "./useSubmit";
import useSettings from "./useSettings";

type AnswerActions = {
  addLetter: (character: string) => void,
  removeLetter: () => void;
  clear: () => void;
}

const answerAtom = atom('');

const useAnswerActions = (): AnswerActions => {
  const { maxCharacters } = useSettings();
  const setValue = useSetAtom(answerAtom);
  const setErrorState = useSetAtom(errorStateAtom);
  const isSubmitting = useAtomValue(isSubmittingAtom);

  const addLetter = useCallback((character: string): void => {
    if (isSubmitting) return;
    if (!character.match(/^[A-Z]$/i)) throw 'Invalid character';
    setErrorState(false);
    setValue((v) => {
      if (v.length >= maxCharacters) return v;
      return v + character.toUpperCase();
    });
  }, [setErrorState, setValue, isSubmitting]);

  const removeLetter = useCallback(() => {
    if (isSubmitting) return;
    setErrorState(false);
    setValue((v) => v.length ? v.substring(0, v.length - 1) : v);
  }, [setErrorState, setValue, isSubmitting]);

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