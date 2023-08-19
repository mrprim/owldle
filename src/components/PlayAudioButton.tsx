import { useCallback, useEffect } from "react";
import useCurrentQuestion from "../useCurrentQuestion"

const PlayAudioButton = () => {
  const { question } = useCurrentQuestion();

  const play = useCallback(async () => {
    const msg = new SpeechSynthesisUtterance(question)
    msg.rate = .65

    await window.speechSynthesis.speak(msg)
  }, [question])

  useEffect(() => {
    play()
    return () => {
      window.speechSynthesis.cancel();
    }
  }, [question, play]);

  return <button onClick={() => play()}>Play</button>
}

export default PlayAudioButton;