import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex-0">
          <FontAwesomeIcon icon={faKiwiBird} className="text-white" size='2xl' />
        </div>

        <div className="flex-0 text-2xl font-sans font-extrabold">
          OWLDLE
        </div>
        <div className="flex-0 flex items-end">
          <FontAwesomeIcon icon={faKiwiBird} className="text-white" size='2xl' />
        </div>

      </div>
    </nav>)
}

export default Navbar;