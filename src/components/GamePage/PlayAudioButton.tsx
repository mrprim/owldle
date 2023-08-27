import { FC, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import store from "../../store";

const PlayAudioButton: FC = observer(() => {
  const word = store.gameStateStore.word;
  const isSpeaking = store.speechStore.isSpeaking;

  const play = useCallback(async () => {
    await store.speechStore.say(word?.pronunciation ?? word?.spelling ?? 'THIS WORD IS MISSING');
  }, [word]);

  useEffect(() => {
    play()
    return () => {
      window.speechSynthesis.cancel();
    }
  }, [word, play]);

  const iconColor = isSpeaking ? 'text-sky-600' : '';

  return <span onClick={() => play()} className={`cursor-pointer ${iconColor}`}>
    <FontAwesomeIcon icon={isSpeaking ? faVolumeHigh : faVolumeOff} size='2xl' />
  </span>
});

export default PlayAudioButton;