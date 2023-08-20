import { FC, useCallback, useEffect, useState } from "react";
import useQuestions from "../../hooks/useQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faVolumeHigh, faVolumeLow, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import say from "../../utils/say";

const PlayAudioButton: FC<{ questionId: number }> = ({ questionId }) => {
  const questions = useQuestions();
  const question = questions[questionId];
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    setPlaying(true);
    await say(question);
    setPlaying(false);
  }, [question])

  useEffect(() => {
    play()
    return () => {
      window.speechSynthesis.cancel();
    }
  }, [question, play]);

  const iconColor = playing ? 'text-sky-600' : '';

  return <span onClick={() => play()} className={`cursor-pointer ${iconColor}`}>
    <FontAwesomeIcon icon={playing ? faVolumeHigh : faVolumeOff} size='2xl' />
  </span>
}

export default PlayAudioButton;