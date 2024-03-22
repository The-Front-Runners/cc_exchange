import { Link, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '../icons/DashboardIcon';
import TransactionIcon from '../icons/TransactionIcon';
import FileTextIcon from '../icons/FileTextIcon';
import ValidationIcon from '../icons/ValidationIcon';
import { ReactNode, FC } from 'react';

interface NavItem {
  icon: ReactNode;
  text: string;
  link: string;
  isSelected: boolean;
}

const NavItem: FC<NavItem> = ({ icon, text, link }) => {
  const location = useLocation();
  return (
    <Link
      className={`flex justify-center items-center gap-4 px-6 py-4 rounded-xl hover:scale-[1.05] ${
        location.pathname === link && 'bg-[#9FD966] '
      }`}
      to={link}
    >
      {icon}
      <div>{text}</div>
    </Link>
  );
};

export default function AppLayout() {
  return (
    <div className="grid grid-cols-[25%_1fr] h-[100vh] bg-main bg-no-repeat bg-cover bg-center max-[1400px]:grid-cols-1">
      <div className="flex flex-col gap-4 px-4 py-10 mx-5 max-[1400px]:hidden">
        <NavItem
          icon={<DashboardIcon />}
          text="Dashboard"
          link="/dashboard"
          isSelected={true}
        />
        <NavItem
          icon={<TransactionIcon />}
          text="Transações"
          link="/transfer"
          isSelected={false}
        />
        <NavItem
          icon={<FileTextIcon />}
          text="Contratos"
          link="/contracts"
          isSelected={false}
        />
        <NavItem
          icon={<ValidationIcon />}
          text="Validação"
          link="/validation"
          isSelected={false}
        />
      </div>
      <div className="h-[95vh] rounded-bl-3xl bg-black/70 text-white">
        <Outlet />
      </div>
    </div>
  );
}
