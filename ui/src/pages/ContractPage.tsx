import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import CarbonCreditContract from '../../generated/CarbonCredit.ts';
import { EmissionValidatorContract } from '../../generated/EmissionValidator.ts';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function ContractPage() {
  const emissionValidatorAddress = EmissionValidatorContract.address;
  const carbonCreditContractAddress = CarbonCreditContract.address;

  const { address } = useAccount();
  const userAddress = address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const emissionValidator = new ethers.Contract(
    EmissionValidatorContract.address,
    EmissionValidatorContract.abi,
    signer
  );

  useEffect(() => {
    console.log('User address:', userAddress);
    console.log('CarbonCredit address:', carbonCreditContractAddress);
    console.log('EmissionValidator address:', emissionValidatorAddress);
    //calling emission validator getRequestsByUser;
    emissionValidator
      .getRequestsByAddress(userAddress)
      .then((requests: number[]) => {
        console.log('Requests:', requests);
      });
  });

  const contracts = [
    {
      name: 'Frota de caminhões elétricos 1',
      tokens: '30 000 $CC',
      status: 'Approved',
    },
    {
      name: 'Frota de caminhões elétricos 2',
      tokens: '15 000 $CC',
      status: 'Claimable',
    },
    {
      name: 'Frota de caminhões elétricos 3',
      tokens: 'Pending',
      status: 'Pending',
    },
    {
      name: 'Frota de caminhões elétricos 4',
      tokens: 'Rejected',
      status: 'Rejected',
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Claimable':
        return 'bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg ml-4';
      case 'Pending':
        return 'bg-green-500 opacity-50 cursor-not-allowed text-white py-2 px-4 rounded-lg';
      case 'Rejected':
        return 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg';
      default:
        return '';
    }
  };

  const handleClaim = (contractName: string) => {
    toast.success(`Claimed tokens for contract: ${contractName}`);

    // Add logic to actually claim tokens
  };

  const handleResend = (contractName: string) => {
    toast.error(`Resent contract: ${contractName}`);
    // Add logic to resend contract
  };

  return (
    <div className="p-5">
      <h1 className="text-white text-xl font-bold mb-5">CONTRATOS</h1>
      <div className="space-y-4">
        {contracts.map((contract, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              contract.status === 'Pending' ? 'opacity-50' : 'bg-green-700'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <p
                className={`text-white ${
                  contract.status === 'Pending' ? 'opacity-50' : ''
                }`}
              >
                {contract.name}
              </p>
              <div className="flex items-center">
                <span
                  className={`font-bold text-lg ${
                    contract.status === 'Pending' ? 'opacity-50' : 'text-white'
                  }`}
                >
                  {contract.tokens}
                </span>
                {['Approved', 'Claimable'].includes(contract.status) && (
                  <button
                    className={getStatusStyles(contract.status)}
                    onClick={() => handleClaim(contract.name)}
                  >
                    Claim
                  </button>
                )}
              </div>
            </div>
            {contract.status === 'Rejected' && (
              <button
                className={getStatusStyles(contract.status)}
                onClick={() => handleResend(contract.name)}
              >
                Reenviar
              </button>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
