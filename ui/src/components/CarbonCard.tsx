import { FC } from 'react';

interface CarbonCardProps {
  text: string;
  number: number;
  color: string;
}

const CarbonCard: FC<CarbonCardProps> = ({ text, number, color }) => {
  return (
    <div
      className={`flex-1 p-4 flex flex-col items-center rounded-xl shadow-md`}
      style={{ backgroundColor: color }}
    >
      <h4 className="text-lg font-semibold text-white">{text}</h4>
      <p className="text-3xl mt-2 mb-1 text-white">{number}</p>
      <p className="text-xs text-white">tCO2e</p>
    </div>
  );
};

export default CarbonCard;
