import { FC, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import useSpeech from "../../hooks/useSpeech";
import { observer } from "mobx-react-lite";
import store from "../../store";

const PlayAudioButton: FC<{ questionId: number }> = observer(({ questionId }) => {
  const question = store.getQuestion(questionId);
  const { isSpeaking, say } = useSpeech()

  const play = useCallback(async () => {
    await say(question?.pronunciation ?? question?.spelling ?? 'THIS WORD IS MISSING');
  }, [question]);

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
});

export default PlayAudioButton;