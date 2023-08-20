import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import utilSay, { UtteranceMutator } from "../utils/say";

const isSpeakingAtom = atom(false);

const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useAtom(isSpeakingAtom);

  const say = useCallback(async (text: string, mutator?: UtteranceMutator) => {
    setIsSpeaking(true);
    await utilSay(text, mutator);
    setIsSpeaking(false);
  }, [useSpeech, setIsSpeaking]);

  return useMemo(() => ({ isSpeaking, say }), [say, isSpeaking]);
};

export default useSpeech;