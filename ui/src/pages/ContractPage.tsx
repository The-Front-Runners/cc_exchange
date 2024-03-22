
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReadContract } from 'wagmi';
import deployedContracts from '../generated/deployedContracts.ts';
import { useEffect } from 'react';

export default function ContractPage() {
  const emissionValidatorABI = deployedContracts["31337"][0].contracts.EmissionValidator.abi;
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const userAddress = '0x2CbefA4CF77376ee42ee0523aC484d8554d16886'; 

  const { data, isError, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: emissionValidatorABI,
    functionName: 'getRequestsByAddress',
    args: [userAddress],
  });

  useEffect(() => {
    console.log('Contract data:', data);
    console.log('Error:', isError);
    console.log('Loading:', isLoading);
    console.log('Error message:', error);
  })

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching contract data</div>;

  const contracts = [
    { name: 'Frota de caminhões elétricos 1', tokens: '30 000 $CC', status: 'Approved' },
    { name: 'Frota de caminhões elétricos 2', tokens: '15 000 $CC', status: 'Claimable' },
    { name: 'Frota de caminhões elétricos 3', tokens: 'Pending', status: 'Pending' },
    { name: 'Frota de caminhões elétricos 4', tokens: 'Rejected', status: 'Rejected' }
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
    <div className="bg-green-900 h-screen p-5">
      <h1 className="text-white text-xl font-bold mb-5">CONTRATOS</h1>
      <div className="space-y-4">
        {contracts.map((contract, index) => (
          <div key={index} className={`p-4 rounded-lg ${contract.status === 'Pending' ? 'opacity-50' : 'bg-green-700'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <p className={`text-white ${contract.status === 'Pending' ? 'opacity-50' : ''}`}>
                {contract.name}
              </p>
              <div className="flex items-center">
                <span className={`font-bold text-lg ${contract.status === 'Pending' ? 'opacity-50' : 'text-white'}`}>
                  {contract.tokens}
                </span>
                {['Approved', 'Claimable'].includes(contract.status) && (
                  <button className={getStatusStyles(contract.status)} onClick={() => handleClaim(contract.name)}>
                    Claim
                  </button>
                )}
              </div>
            </div>
            {contract.status === 'Rejected' && (
              <button className={getStatusStyles(contract.status)} onClick={() => handleResend(contract.name)}>
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
