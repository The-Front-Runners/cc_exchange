import { FC } from 'react';

interface CarbonCard {
  text: string;
  number: number;
  color: string;
}

const CarbonCard: FC<CarbonCard> = ({ text, number, color }) => {
  return (
    <div
      className={`flex-1 p-4 flex flex-col items-center bg-opacity-70 rounded-xl shadow-2xl`}
      style={{ backgroundColor: color }}
    >
      <h4 className="text-xl font-bold">{text}</h4>
      <p className="text-5xl mt-4 mb-1">{number}</p>
      <p>tCO2e</p>
    </div>
  );
};

export default CarbonCard;
