import { FC } from "react";
import useAnswerActions from "../../hooks/useAnswerActions";
import useSubmit from "../../hooks/useSubmit";
import useSettings, { KeyboardLayout, KeyboardStyle } from "../../hooks/useSettings";
import setCase from "../../utils/setCase";


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
  font-sans
  bg-slate-300
  text-md md:text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onPointerDown={() => {
      navigator.vibrate(100);
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
  font-sans
  bg-slate-300
  text-xl
  md:w-20 w-16
  h-14 m-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`}
    onPointerDown={() => {
      navigator.vibrate(100);
      removeLetter();
    }}>
    <p className="flex-grow font-bold">
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
  const { addLetter } = useAnswerActions();
  const label = setCase(value, capitalization);
  const bgColor = getKeyboardStyle(characterIndex + rowIndex, keyboardStyle);

  return <div className={`
  font-sans
  ${bgColor}
  text-xl
  md:w-12 w-7 h-14 mx-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`} onPointerDown={() => {
      navigator.vibrate(100);
      addLetter(value)
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
    <div className='mx-auto mb-10'>
      <Row index={0} />
      <Row index={1} />
      <Row index={2} />
    </div>
  )
}

export default Keyboard;