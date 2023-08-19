import { FC } from "react";
import useAnswerActions from "../useAnswerActions";
import useSubmit from "../useSubmit";

const DEFAULT_VIEW: Layout = 'alpha';

type Layout = 'qwerty' | 'alpha';

const LAYOUTS: Record<Layout, string[]> = {
  qwerty: [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ],
  alpha: [
    'ABCDEFGHIJ',
    'KLMNOPQR',
    'STUVWXYZ',
  ]
};

type KeyProps = {
  value: string;
  label?: string;
  size?: 'md' | 'lg';
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Key: FC<KeyProps> = ({ label, size = 'md', textSize = 'xl', value }) => {
  const submit = useSubmit();
  const { removeLetter, addLetter } = useAnswerActions();
  const widthClass = size === 'lg' ? 'w-20' : 'w-12';

return <div className={`
  bg-slate-300
  text-${textSize}
  ${widthClass} h-14 mx-1
  inline-flex items-center align-middle
  rounded-md cursor-pointer
  text-center`} onClick={() => {
    if(value.length === 1) {
      addLetter(value)
    } else if (value === 'Backspace') {
      removeLetter();
    } else {
      submit();
    }
  }}>
    <p className="flex-grow font-bold">
      {label ?? value}
    </p>
</div>
}

type RowProps = {
  index: number;
  type?: Layout;
}

const Row: FC<RowProps> = ({ index, type = DEFAULT_VIEW }) => {
  const charList = LAYOUTS[type][index];
  return (
    <div className='my-2'>
      {index === 2 && <Key value='Enter' textSize="lg" size="lg" />}
      {charList.split('').map((char: string) => <Key key={char} value={char} /> )}
      {index === 2 && <Key label={'⌫'} value='Backspace' textSize="lg" size="lg" />}
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