import { useEffect } from "react";
import store from "../store";

const handler = (e: KeyboardEvent): void => {
  if (store.gameStateStore.isSubmitting) return;
  if (e.altKey || e.ctrlKey) return;


  const key = e.key;

  if (key !== 'Backspace' && key !== 'Enter' && !key.match(/^[a-zA-Z]$/i)) return;
  if (key === 'Backspace') {
    store.gameStateStore.removeLetterFromAnswer();
  } else if (key === 'Enter') {
    store.gameStateStore.submit();
  } else {
    store.gameStateStore.addLetterToAnswer(key);
  }
  e.preventDefault();

};


const useAttachKeyboardHandler = () => {

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handler]);
}

export default useAttachKeyboardHandler;