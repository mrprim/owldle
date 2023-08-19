import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faKiwiBird, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react';
import { useSetScreen } from '../hooks/useScreen';


const Navbar: FC<{ className?: string }> = ({ className }) => {
  const setScreen = useSetScreen();

  return (
    <nav className={`${className ?? ''} bg-white border-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex-0">
          <button className='mx-2' onClick={() => setScreen('home')}>
            <FontAwesomeIcon icon={faKiwiBird} size='2xl' />
          </button>
        </div>

        <div className="flex-0 text-2xl font-sans font-extrabold">
          OWLDLE
        </div>
        <div className="flex-0 flex items-end">
          <button className='mx-2' onClick={() => setScreen('review')}>
            <FontAwesomeIcon icon={faListUl} size='2xl' />
          </button>
          <button className='mx-2' onClick={() => setScreen('settings')}>
            <FontAwesomeIcon icon={faGear} size='2xl' />
          </button>
        </div>

      </div>
    </nav>)
}

export default Navbar;