import { FC } from "react";
import store from "../../store";
import { CapitalizationMode, KeyboardLayout, KeyboardStyle } from "../../store/settingsStore";
import { observer } from 'mobx-react-lite'


const LAYOUTS: Record<KeyboardLayout, string[]> = {
  qwerty: [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ],
  alpha: [
    'ABCDEFGHIJ',
    'KLMNOPQRST',
    'UVWXYZ',
  ]
};

type KeyProps = {
  value: string;
  characterIndex: number;
  rowIndex: number;
  capitalization: CapitalizationMode;
  keyboardStyle: KeyboardStyle;
}

const EnterKey = () => {
  return <div className={`
  font-sans
  bg-slate-300 dark:bg-slate-600
  text-md md:text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onClick={() => {
      store.gameStateStore.submit();
    }}>
    <p className="flex-grow font-semibold">
      Enter
    </p>
  </div>
}

const BackspaceKey = () => {
  return <div className={`
  font-sans
  bg-slate-300 dark:bg-slate-600
  text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onClick={() => {
      store.gameStateStore.removeLetterFromAnswer();
    }}>
    <p className="flex-grow font-semibold">
      ⌫
    </p>
  </div>
}

const getKeyboardStyle = (characterIndex: number, keyboardStyle: KeyboardStyle) => {
  if (keyboardStyle === 'gray') return 'bg-slate-300  dark:bg-slate-600';
  const colors = ['rose', 'emerald', 'violet', 'amber', 'sky'];
  const color = colors[characterIndex % colors.length];

  return `dark:bg-${color}-600 bg-${color}-200`;

}

const Key: FC<KeyProps> = ({ value, characterIndex, rowIndex, capitalization, keyboardStyle }) => {
  const bgColor = getKeyboardStyle(characterIndex + rowIndex * 3, keyboardStyle);

  return <div className={`
  ${bgColor}
  text-xl
  md:w-12 w-7 h-14 mx-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`} onClick={() => {
    store.gameStateStore.addLetterToAnswer(value)
    }}>
    <p className={`flex-grow font-semibold ${capitalization}`}>
      {value}
    </p>
  </div>
}

type RowProps = {
  index: number;
}

const Row: FC<RowProps> = observer(({ index }) => {
  const { keyboardLayout, capitalization, keyboardStyle } = store.settingsStore.settings;

  const charList = LAYOUTS[keyboardLayout][index];
  return (
    <div className='my-2'>
      {index === 2 && <EnterKey />}
      {charList.split('').map((char: string, i) =>
        <Key key={char}
          value={char}
          characterIndex={i}
          capitalization={capitalization}
          keyboardStyle={keyboardStyle}
          rowIndex={index} />)
      }
      {index === 2 && <BackspaceKey />}
    </div>
  )
});

const Keyboard: FC = () => {
  return (
    <div className='mx-auto mb-10'>
      <Row index={0} />
      <Row index={1} />
      <Row index={2} />
    </div>
  )
}

export default Keyboard;