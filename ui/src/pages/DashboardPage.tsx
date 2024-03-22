import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import CarbonFootprintCard from '../components/CarbonFootprintCard';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CarbonCard from '../components/CarbonCard';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import EqualIcon from '../icons/EqualIcon';
import CarbonButton from '../components/CarbonButton';

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);
  return (
    <div className="h-full pt-5 pb-14 pl-16 grid grid-rows-[auto_1fr] gap-5">
      <div className="grid grid-cols-[1fr_5fr_1fr] place-items-center pr-4">
        <div className="w-[184px]"></div>
        <CarbonFootprintCard />
        <div className="self-end">
          <ConnectButton chainStatus="none" accountStatus="avatar" />
        </div>
      </div>
      <div className="grid grid-cols-[5fr_4fr]">
        <div className="flex flex-col gap-6">
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <h2 className="text-2xl font-bold">DASHBOARD</h2>
            <div className="ml-20 self-start bg-custom-gray border-4 rounded-full border-[#64C222] w-2/3 py-2 text-center text-black font-semibold text-5xl">
              <p>
                0.00500165<span className="text-xs">$CC</span>
              </p>
              <p className="text-xs">Crédito de Carbono</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">BALANÇO GERAL DE CARBONO</h3>
            <div className="flex-1 flex justify-center gap-5">
              <CarbonCard
                text="CONSUMO"
                number={400}
                color="rgba(150, 106, 55, 0.70)"
              />
              <CarbonCard
                text="PRODUÇÃO"
                number={1000}
                color="rgba(59, 115, 20, 0.70)"
              />
              <CarbonCard
                text="EXCEDENTE"
                number={600}
                color="rgba(132, 141, 132, 0.70)"
              />
            </div>
          </div>
          <div className="rounded-xl shadow-2xl bg-gradient-to-r from-[#966A37]  to-[#3B7314] p-10 grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-7">
            <div
              className={`p-4 flex flex-col items-center bg-opacity-70 rounded-xl row-span-3`}
              style={{
                backgroundImage: 'linear-gradient(#346213, #519D1C, #6FD926)',
              }}
            >
              <h4 className="text-xl font-bold text-center">
                CARBONO DISPONÍVEL PARA NEUTRALIZAÇÃO
              </h4>
              <p className="text-5xl mt-8 mb-1">{100}</p>
              <p>tCO2e</p>
            </div>
            <CarbonButton icon={<MinusIcon />} text="Vender" />
            <CarbonButton icon={<PlusIcon />} text="Comprar" />
            <CarbonButton icon={<EqualIcon />} text="Neutralizar" />
          </div>
        </div>
        <div>TABELA HISTÓRICO</div>
      </div>
    </div>
  );
}
