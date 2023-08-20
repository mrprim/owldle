type UtteranceMutator = (msg: SpeechSynthesisUtterance) => void;

const say = async (text: string, mutator?: UtteranceMutator) => {
  const msg = new SpeechSynthesisUtterance(text)
  msg.rate = .65

  if (mutator) {
    mutator(msg);
  }

  return new Promise(function (resolve) {
    msg.onend = resolve;
    window.speechSynthesis.speak(msg)
  });
}

export type { UtteranceMutator };
export default say;