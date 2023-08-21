import { FC, useCallback, useEffect } from "react";
import useQuestions from "../../hooks/useQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import useSpeech from "../../hooks/useSpeech";

const PlayAudioButton: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();
  const question = questions[questionId];
  const { isSpeaking, say } = useSpeech()

  const play = useCallback(async () => {
    await say(question.pronunciation ?? question.spelling);
  }, [question])

  useEffect(() => {
    play()
    return () => {
      window.speechSynthesis.cancel();
    }
  }, [question, play]);

  const iconColor = isSpeaking ? 'text-sky-600' : '';

  return <span onClick={() => play()} className={`cursor-pointer ${iconColor}`}>
    <FontAwesomeIcon icon={isSpeaking ? faVolumeHigh : faVolumeOff} size='2xl' />
  </span>
}

export default PlayAudioButton;