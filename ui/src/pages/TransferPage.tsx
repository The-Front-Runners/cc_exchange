import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function DexTransferPage() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('DAI');
  const [amount, setAmount] = useState('');

  // Swap the tokens
  const handleSwapTokens = () => {
    // Invert the tokens
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  // Placeholder for swap logic
  const handleSwap = () => {
    console.log(`Swapping ${amount} ${fromToken} to ${toToken}`);
    // Here you would add the logic for swapping tokens
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-white text-xl font-bold mb-5">
        Decentralized Exchange
      </h1>
      <div className="bg-green-700 p-8 rounded-lg w-full sm:w-96 flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center mb-8 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:mr-4">
            <label htmlFor="fromToken" className="text-white mb-2 mr-2 sm:mr-4">
              From:
            </label>
            <select
              id="fromToken"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-green-800 text-white p-2 rounded"
            >
              <option value="CC">CC</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <button
            onClick={handleSwapTokens}
            className="text-white bg-green-600 p-2 rounded mt-2 sm:mt-0"
          >
            ⇅
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:ml-4">
            <label htmlFor="toToken" className="text-white mb-2 mr-2 sm:mr-4">
              To:
            </label>
            <select
              id="toToken"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-green-800 text-white p-2 rounded"
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full mb-8">
          <label htmlFor="amount" className="text-white mb-2">
            Amount:
          </label>
          <input
            id="amount"
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-green-800 text-white p-2 rounded"
          />
        </div>
        <button
          onClick={handleSwap}
          className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors w-full"
        >
          Swap
        </button>
      </div>
    </div>
  );
}
