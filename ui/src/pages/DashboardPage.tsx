import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import CarbonFootprintCard from '../components/CarbonFootprintCard';
import CarbonCard from '../components/CarbonCard';
import CarbonButton from '../components/CarbonButton';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import EqualIcon from '../icons/EqualIcon';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function DashboardPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="h-screen pt-5 pb-14 pl-4 md:pl-16 grid grid-rows-[auto_1fr] md:gap-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr_1fr] place-items-center pr-4 md:pr-0">
        <div className="w-[184px]"></div>
        <CarbonFootprintCard />
        <div className="self-end">
          <ConnectButton chainStatus="none" accountStatus="avatar" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr]">
        <div className="flex flex-col gap-6">
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <h2 className="text-2xl font-bold">DASHBOARD</h2>
            <div className="ml-0 md:ml-20 self-start bg-custom-gray border-4 rounded-full border-[#64C222] w-full md:w-2/3 py-2 text-center text-black font-semibold text-5xl">
              <p>
                0.00500165<span className="text-xs">$CC</span>
              </p>
              <p className="text-xs">Crédito de Carbono</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">BALANÇO GERAL DE CARBONO</h3>
            <div className="flex-1 flex flex-col md:flex-row justify-center md:justify-start gap-5">
              <CarbonCard text="CONSUMO" number={400} color="rgba(150, 106, 55, 0.70)" />
              <CarbonCard text="PRODUÇÃO" number={1000} color="rgba(59, 115, 20, 0.70)" />
              <CarbonCard text="EXCEDENTE" number={600} color="rgba(132, 141, 132, 0.70)" />
            </div>
          </div>
          <div className="rounded-xl shadow-2xl bg-gradient-to-r from-green-600 to-green-700 p-5 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1 flex flex-col items-center text-white bg-green-800 bg-opacity-90 rounded-xl p-4 space-y-4">
          <h4 className="text-xl font-bold text-center">CARBONO DISPONÍVEL PARA NEUTRALIZAÇÃO</h4>
          <div className="text-5xl">{100}</div>
          <div>tCO2e</div>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-5">
          <CarbonButton icon={<MinusIcon />} text="Vender" />
          <CarbonButton icon={<PlusIcon />} text="Comprar" />
          <CarbonButton icon={<EqualIcon />} text="Neutralizar" />
        </div>
      </div>


        </div>
        <div className="hidden md:block">TABELA HISTÓRICO</div>
      </div>
    </div>
  );
}

export default DashboardPage;
