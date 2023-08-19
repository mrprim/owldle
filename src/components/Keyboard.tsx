import { FC } from "react";
import useAnswerActions from "../hooks/useAnswerActions";
import useSubmit from "../hooks/useSubmit";
import useSettings, { KeyboardLayout, KeyboardStyle } from "../hooks/useSettings";
import setCase from "../utils/setCase";


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
  const submit = useSubmit();

  return <div className={`
  bg-slate-300
  text-md md:text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onClick={() => {
      submit();
    }}>
    <p className="flex-grow font-bold">
      Enter
    </p>
  </div>
}

const BackspaceKey = () => {
  const { removeLetter } = useAnswerActions();

  return <div className={`
  bg-slate-300
  text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onClick={() => {
      removeLetter();
    }}>
    <p className="flex-grow font-bold">
      ⌫
    </p>
  </div>
}

const getKeyboardStyle = (characterIndex: number, keyboardStyle: KeyboardStyle) => {
  if (keyboardStyle === 'gray') return 'bg-slate-300';
  const colors = ['red', 'emerald', 'yellow', 'purple', 'sky'];
  const color = colors[characterIndex % colors.length];

  return `bg-${color}-200`;

}

const DontUse = () => <div className='bg-red-200 bg-emerald-200 bg-yellow-200 bg-purple-200 bg-sky-200' />

const Key: FC<KeyProps> = ({ value, characterIndex, rowIndex }) => {
  const { capitalization, keyboardStyle } = useSettings();
  const { removeLetter, addLetter } = useAnswerActions();
  const label = setCase(value, capitalization);
  const bgColor = getKeyboardStyle(characterIndex + rowIndex, keyboardStyle);

  return <div className={`
  ${bgColor}
  text-xl
  md:w-12 w-7 h-14 mx-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`} onClick={() => {
    if (value.length === 1) {
      addLetter(value)
    } else if (value === 'Backspace') {
      removeLetter();
      }
    }}>
    <p className="flex-grow font-bold">
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
    <div className='mx-auto font-sans'>
      <Row index={0} />
      <Row index={1} />
      <Row index={2} />
    </div>
  )
}

export default Keyboard;