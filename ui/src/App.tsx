import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import TransferPage from './pages/TransferPage.tsx';
import ContractPage from './pages/ContractPage.tsx';
import ValidationPage from './pages/ValidationPage.tsx';
import AppLayout from './components/AppLayout.tsx';

// Rainbow Kit
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  Chain,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const anvil = {
  id: 31_337,
  name: 'Anvil',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Carbon Credit Exchange',
  projectId: 'YOUR_PROJECT_ID',
  chains: [anvil],
  ssr: false,
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: 'linear-gradient(to left, #3e70a1, #6bd124);',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          initialChain={anvil}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/contracts" element={<ContractPage />} />
              <Route path="/validation" element={<ValidationPage />} />
            </Route>
          </Routes>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
