import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faKiwiBird } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react';
import useSettings, { useSetSetting } from '../hooks/useSettings';


const Navbar: FC<{ className?: string }> = ({ className }) => {
  const settings = useSettings();
  const setSetting = useSetSetting();

  return (
    <nav className={`${className ?? ''} bg-white border-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex-0">
          <FontAwesomeIcon icon={faKiwiBird} size='2xl' />
        </div>

        <div className="flex-0 text-2xl font-sans font-extrabold">
          OWLDLE
        </div>
        <div className="flex-0 flex items-end">
          <button data-modal-target="settingsModal" data-modal-toggle="settingsModal">
            <FontAwesomeIcon icon={faGear} size='2xl' />
          </button>
        </div>

      </div>
    </nav>)
}

export default Navbar;