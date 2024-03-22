export default function ContractPage() {
  // Example statuses for demonstration
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
                  <button className={getStatusStyles(contract.status)}>
                    Claim
                  </button>
                )}
              </div>
            </div>
            {contract.status === 'Rejected' && (
              <button className={getStatusStyles(contract.status)}>
                Reenviar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
