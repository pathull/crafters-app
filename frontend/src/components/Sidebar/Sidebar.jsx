import { BsArrowLeftShort, BsSearch } from 'react-icons/bs';
import { FiLogOut, FiPlusSquare } from 'react-icons/fi';
import { GiSewingMachine } from 'react-icons/gi';
import { FaUser, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [toggleButton, setToggleButton] = useState(true);
  const { logout } = useAuth0();

  const handleLogoutUser = () => {
    localStorage.removeItem('token');
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className={`bg-dark-blue h-screen p-3 pt-8 ${toggleButton ? 'w-72' : 'w-20'} duration-300 relative`}>
      <BsArrowLeftShort
        onClick={() => setToggleButton(!toggleButton)}
        className={`bg-white text-dark-blue text-3xl rounded-full absolute -right-3 top-10 border-2 border-dark-blue cursor-pointer ${
          !toggleButton ? 'rotate-180' : ''
        }`}
        data-testid="toggle-button"
      />
      <div className="flex items-center p-2 hover:bg-gray-600/90 hover:duration-500 rounded">
        <Link to="/home" className="inline-flex">
          <GiSewingMachine
            className={`text-4xl bg-soft-purple rounded p-1 cursor-pointer mr-2 duration-500 ${
              !toggleButton ? 'rotate-[360deg]' : ''
            }`}
          />
          <h1 className={`text-white origin-left font-medium text-2xl ${!toggleButton ? 'hidden' : ''}`}>Crafters</h1>
        </Link>
      </div>

      <div className="items-center rounded-md bg-light-white mt-6 px-4 py-2 hidden">
        <BsSearch className="text-white my-1" />
        <input
          type="text"
          placeholder="Search..."
          className={`text-base bg-transparent w-full border-none focus:ring-0 text-white ${
            !toggleButton ? 'hidden' : ''
          }`}
        />
      </div>

      <ul className="mt-4">
        <li className="text-white duration-300 mt-2 rounded-md hover:bg-light-white">
          <Link
            to="/profile"
            className={`p-2 cursor-pointer text-lg flex items-center ${toggleButton ? 'gap-x-4' : ''}`}
          >
            <FaUser className="text-2xl" />
            <span className={`font-medium duration-200 flex-1 ${!toggleButton ? 'hidden' : ''}`}>Profile</span>
          </Link>
        </li>

        <li className="text-white duration-300 mt-2 rounded-md hover:bg-light-white">
          <Link
            to="/create/post"
            className={`p-2 cursor-pointer text-lg flex items-center ${toggleButton ? 'gap-x-4' : ''}`}
          >
            <FiPlusSquare className="text-2xl" />
            <span className={`font-medium duration-200 flex-1 ${!toggleButton ? 'hidden' : ''}`}>Create</span>
          </Link>
        </li>

        <li className="text-white duration-300 mt-2 rounded-md hover:bg-light-white">
          <Link
            to="/wishlist"
            className={`p-2 cursor-pointer text-lg flex items-center ${toggleButton ? 'gap-x-4' : ''}`}
          >
            <FaStar className="text-2xl" />
            <span className={`font-medium duration-200 flex-1 ${!toggleButton ? 'hidden' : ''}`}>Wish list</span>
          </Link>
        </li>

        <li className="text-white duration-300 mt-2 rounded-md hover:bg-light-white">
          <button
            onClick={handleLogoutUser}
            className={`p-2 cursor-pointer text-lg flex items-center ${toggleButton ? 'gap-x-4' : ''}`}
          >
            <FiLogOut className="text-2xl" />
            <span className={`font-medium duration-200 flex-1 ${!toggleButton ? 'hidden' : ''}`}>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
