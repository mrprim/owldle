import isAndroid from "./isAndroid";

type UtteranceMutator = (msg: SpeechSynthesisUtterance) => void;

const pronounceALetter = (c: string) => {
  if (c.toUpperCase() === 'A') {
    return isAndroid ? 'A' : 'EH';
  } else {
    return c.toUpperCase();
  }
}

const pronounce = (word: string): string => [...word].map(pronounceALetter).join(' -- ');

const say = async (text: string, mutator?: UtteranceMutator) => {

  // View a word
  const msg = new SpeechSynthesisUtterance(text)
  msg.rate = .65

  if (mutator) {
    mutator(msg);
  }

  window.speechSynthesis.cancel();
  return new Promise(function (resolve) {
    msg.onend = resolve;
    window.speechSynthesis.speak(msg)
  });
}

export type { UtteranceMutator };
export { pronounce };

export default say;