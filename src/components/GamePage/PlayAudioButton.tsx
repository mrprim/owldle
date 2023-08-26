import { FC, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import store from "../../store";

const PlayAudioButton: FC<{ wordId: number }> = observer(({ wordId }) => {
  const question = store.wordListStore.getWord(wordId);
  const isSpeaking = store.speechStore.isSpeaking;

  const play = useCallback(async () => {
    await store.speechStore.say(question?.pronunciation ?? question?.spelling ?? 'THIS WORD IS MISSING');
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