import { Link, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '../icons/DashboardIcon';
import TransactionIcon from '../icons/TransactionIcon';
import FileTextIcon from '../icons/FileTextIcon';
import ValidationIcon from '../icons/ValidationIcon';
import { FC, useState } from 'react';

interface NavItemProps {
  icon: JSX.Element;
  text: string;
  link: string;
}

const NavItem: FC<NavItemProps> = ({ icon, text, link }) => {
  const location = useLocation();
  const isSelected = location.pathname === link;
  return (
    <Link
      to={link}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
        isSelected ? 'bg-[#9FD966] text-white' : 'text-gray-300 hover:text-white'
      } hover:bg-green-800`}
    >
      {icon}
      <span className={`${isSelected ? 'font-semibold' : ''}`}>{text}</span>
    </Link>
  );
};

const AppLayout: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full bg-green-900">
      <nav
        className={`fixed top-0 left-0 h-full w-64 flex flex-col gap-4 p-4 overflow-auto bg-green-800 transition-all duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            &#x2715;
          </button>
        </div>
        <NavItem icon={<DashboardIcon />} text="Dashboard" link="/dashboard" />
        <NavItem icon={<TransactionIcon />} text="Transações" link="/transfer" />
        <NavItem icon={<FileTextIcon />} text="Contratos" link="/contracts" />
        <NavItem icon={<ValidationIcon />} text="Validação" link="/validation" />
      </nav>
      <div className="flex-1 h-full p-4 overflow-auto text-white bg-black bg-opacity-70 rounded-bl-3xl">
        <button
          className="fixed top-4 left-4 z-50 text-white bg-green-800 p-2 rounded-full focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
