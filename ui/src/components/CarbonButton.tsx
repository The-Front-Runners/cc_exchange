import { ReactNode, FC } from 'react';

interface CarbonButton {
  icon: ReactNode;
  text: string;
  click(): void;
}

const CarbonButton: FC<CarbonButton> = ({ icon, text, click }) => {
  return (
    <button
      className="py-5 rounded-2xl font-semibold shadow-2xl hover:scale-[1.05] flex justify-center items-center gap-3"
      style={{
        backgroundImage: 'linear-gradient(to right, #346213, #519D1C, #6FD926)',
      }}
      onClick={() => {
        click();
      }}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default CarbonButton;
