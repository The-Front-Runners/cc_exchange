import { useEffect, useState } from 'react';
import { useAccount, UseAccountReturnType } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import CarbonFootprintCard from '../components/CarbonFootprintCard';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CarbonCard from '../components/CarbonCard';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import EqualIcon from '../icons/EqualIcon';
import CarbonButton from '../components/CarbonButton';

import { ethers } from 'ethers';
import CarbonCreditContract from '../../generated/CarbonCredit';

const tokenAddress = CarbonCreditContract.address;
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const tokenContract = new ethers.Contract(
  tokenAddress,
  CarbonCreditContract.abi,
  provider
);

async function burnToken(value: number, account: UseAccountReturnType) {
  try {
    const signer = provider.getSigner();
    const tokenContractWithSigner = tokenContract.connect(signer);
    await tokenContractWithSigner.burn(value);
    const balanceOf = await tokenContract.balanceOf(account.address);
    const formattedBalanceOf = ethers.utils.formatUnits(balanceOf, 18);
    return formattedBalanceOf;
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function getTokenDetails(account: UseAccountReturnType) {
  try {
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    const balanceOf = await tokenContract.balanceOf(account.address);
    const formattedBalanceOf = ethers.utils.formatUnits(balanceOf, 18);

    console.log(`Token Name: ${name}`);
    console.log(`Token Symbol: ${symbol}`);
    console.log(`Token Decimals: ${decimals}`);
    console.log(`BalanceOf: ${formattedBalanceOf}`);

    return formattedBalanceOf || '';
  } catch (error) {
    console.error('Failed to fetch token details:', error);
    return '';
  }
}

export default function DashboardPage() {
  const account = useAccount();
  const navigate = useNavigate();

  const [balanceOf, setBalanceOf] = useState('');

  const productionValue = 1000;
  const [consumptionValue, setConsumptionValue] = useState(1200);
  const [excessValue, setExcessValue] = useState(-200);

  useEffect(() => {
    if (!account.isConnected) {
      navigate('/');
    } else {
      getTokenDetails(account).then(setBalanceOf);
    }
  }, [account, navigate]);
  return (
    <div className="h-full pt-5 pb-14 px-16 grid grid-rows-[auto_1fr] gap-10">
      <div className="grid grid-cols-[1fr_5fr_1fr] place-items-center pr-4">
        <div className="w-[184px]"></div>
        <CarbonFootprintCard />
        <div className="self-end">
          <ConnectButton chainStatus="none" accountStatus="avatar" />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-6">
          <div className="grid grid-rows-1 gap-4">
            <div className="justify-self-center self-start bg-custom-gray border-4 rounded-full border-[#64C222] w-2/3 py-2 text-center text-black font-semibold text-5xl">
              <p>
                {balanceOf}
                <span className="text-xs">$CC</span>
              </p>
              <p className="text-xs">Crédito de Carbono</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">BALANÇO GERAL DE CARBONO</h3>
            <div className="flex-1 flex justify-center gap-5">
              <CarbonCard
                text="CONSUMO"
                number={consumptionValue}
                color="rgba(150, 106, 55, 0.70)"
              />
              <CarbonCard
                text="PRODUÇÃO"
                number={productionValue}
                color="rgba(59, 115, 20, 0.70)"
              />
              <CarbonCard
                text="EXCEDENTE"
                number={excessValue}
                color="rgba(132, 141, 132, 0.70)"
              />
            </div>
          </div>
          <div className="rounded-xl shadow-2xl bg-gradient-to-r from-[#966A37]  to-[#3B7314] p-10 grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-7">
            <div
              className={`p-4 flex flex-col items-center bg-opacity-70 rounded-2xl row-span-3`}
              style={{
                backgroundImage: 'linear-gradient(#346213, #519D1C, #6FD926)',
              }}
            >
              <h4 className="text-xl font-bold text-center">
                CARBONO DISPONÍVEL PARA NEUTRALIZAÇÃO
              </h4>
              <p className="text-5xl mt-8 mb-1">{balanceOf.slice(0, -2)}</p>
              <p>tCO2e</p>
            </div>
            <CarbonButton
              click={() => {
                navigate('/transfer');
              }}
              icon={<MinusIcon />}
              text="Vender"
            />
            <CarbonButton
              click={() => {
                navigate('/transfer');
              }}
              icon={<PlusIcon />}
              text="Comprar"
            />
            <CarbonButton
              click={async () => {
                if (excessValue < 0) {
                  const neutralizationNumber = parseInt(balanceOf.slice(0, -2));
                  if (neutralizationNumber < consumptionValue) {
                    const burnValue = consumptionValue - neutralizationNumber;
                    setConsumptionValue(burnValue);
                    setExcessValue(burnValue - productionValue);
                    burnToken(burnValue, account);
                  } else {
                    setConsumptionValue(0);
                    setExcessValue(0);
                    burnToken(consumptionValue, account);
                  }
                  location.reload();
                }
              }}
              icon={<EqualIcon />}
              text="Neutralizar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
