import { FC, ReactNode } from 'react';

interface CarbonButtonProps {
  icon: ReactNode;
  text: string;
}

const CarbonButton: FC<CarbonButtonProps> = ({ icon, text }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-shadow duration-300 ease-in-out bg-gradient-to-r from-green-600 to-green-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default CarbonButton;
