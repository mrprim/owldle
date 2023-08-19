import { useCallback, useEffect } from "react";
import useAnswerActions from "./useAnswerActions";
import useSubmit, { isSubmittingAtom } from "./useSubmit";
import { useAtomValue } from "jotai";

const useAttachKeyboardHandler = () => {
  const submit = useSubmit();
  const { addLetter, removeLetter } = useAnswerActions();
  const isSubmitting = useAtomValue(isSubmittingAtom)

  const handler = useCallback((e: KeyboardEvent): void => {
    if (isSubmitting) return;
    if (e.altKey || e.ctrlKey) return;


    const key = e.key;

    if (key !== 'Backspace' && key !== 'Enter' && !key.match(/^[a-zA-Z]$/i)) return;
    if (key === 'Backspace') {
      removeLetter();
    } else if (key === 'Enter') {
      submit();
    } else {
      addLetter(key);
    }
    e.preventDefault();

  }, [removeLetter, addLetter, submit, isSubmitting]);

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handler]);
}

export default useAttachKeyboardHandler;