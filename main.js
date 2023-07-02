import {configureChains, createConfig, prepareSendTransaction, sendTransaction} from "@wagmi/core";
import { arbitrum, avalanche, mainnet, polygon } from "@wagmi/core/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";

// 1. Define constants
const projectId = "a82986d2dc104e10f7e8042da7b0b542";
if (!projectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

const chains = [mainnet, polygon, avalanche, arbitrum];

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
);

document.getElementById("sendTx").onclick = async function (){
  const config = await prepareSendTransaction({
    chain:  mainnet,
    chainId: 1,
    to: "0x79280d9DDb2753f1fdB85924c81ECB831AB9C8c5",
    value: 100000,
  });

  const { hash } = await sendTransaction(config)
  console.log("hash", hash)
};
