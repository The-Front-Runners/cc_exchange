import CO2Logo from '../icons/CO2Logo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export default function HomePage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);
  return (
    <div className="flex items-center h-screen text-white bg-lime-500">
      <div className="w-[45%] px-24 ">
        <h2 className="font-bold text-6xl mb-4">
          "Se poluição é dinheiro, qual é o valor de um bom ar?"
        </h2>
        <p className="font-medium text-2xl">
          Para iniciar o processo de compra e venda de carbono, é necessário
          conectar sua carteira.
        </p>
      </div>
      <div className="w-[55%] relative">
        <div className="flex flex-col items-center text-center h-[90vh] rounded-l-lg bg-black/70">
          <div className="mt-20">
            <CO2Logo />
          </div>
          <h2 className="text-5xl mt-[-40px]">Bem-vindo novamente!</h2>
          <div
            id="connectButtonContainer"
            className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%]"
          >
            <ConnectButton label="Conecte sua carteira" />
          </div>
        </div>
      </div>
    </div>
  );
}
