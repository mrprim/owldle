import { FC, useCallback, useEffect } from "react";
import useQuestions from "../../hooks/useQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const PlayAudioButton: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();
  const question = questions[questionId];

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

  return <span onClick={() => play()} className='cursor-pointer'>
    <FontAwesomeIcon icon={faPlayCircle} size='2xl' />
  </span>
}

export default PlayAudioButton;