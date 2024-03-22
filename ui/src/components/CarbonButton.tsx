import { ReactNode, FC } from 'react';

interface CarbonButton {
  icon: ReactNode;
  text: string;
}

const CarbonButton: FC<CarbonButton> = ({ icon, text }) => {
  return (
    <button
      className="py-5 rounded-xl font-semibold shadow-2xl hover:scale-[1.05] flex justify-center items-center gap-3"
      style={{
        backgroundImage: 'linear-gradient(to right, #346213, #519D1C, #6FD926)',
      }}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default CarbonButton;
