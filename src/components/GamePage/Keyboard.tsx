import { FC } from "react";
import useSettings, { KeyboardLayout, KeyboardStyle } from "../../hooks/useSettings";
import setCase from "../../utils/setCase";
import store from "../../store";


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
}

const EnterKey = () => {
  return <div className={`
  font-sans
  bg-slate-300
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
  bg-slate-300
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
  if (keyboardStyle === 'gray') return 'bg-slate-300';
  const colors = ['rose', 'emerald', 'amber', 'violet', 'sky'];
  const color = colors[characterIndex % colors.length];

  return `bg-${color}-200`;

}

const Key: FC<KeyProps> = ({ value, characterIndex, rowIndex }) => {
  const { capitalization, keyboardStyle } = useSettings();
  const label = setCase(value, capitalization);
  const bgColor = getKeyboardStyle(characterIndex + rowIndex, keyboardStyle);

  return <div className={`
  ${bgColor}
  text-xl
  md:w-12 w-7 h-14 mx-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`} onClick={() => {
    store.gameStateStore.addLetterToAnswer(value)
    }}>
    <p className="flex-grow font-semibold">
      {label}
    </p>
  </div>
}

type RowProps = {
  index: number;
}

const Row: FC<RowProps> = ({ index }) => {
  const { keyboardLayout } = useSettings();
  const charList = LAYOUTS[keyboardLayout][index];
  return (
    <div className='my-2'>
      {index === 2 && <EnterKey />}
      {charList.split('').map((char: string, i) => <Key key={char} value={char} characterIndex={i} rowIndex={index} />)}
      {index === 2 && <BackspaceKey />}
    </div>
  )
}

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