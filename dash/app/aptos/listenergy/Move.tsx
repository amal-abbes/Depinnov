"use client";
import React, { useState, useEffect } from "react";
import { AptosClient } from "aptos";
import { Aptos } from "@aptos-labs/ts-sdk";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const SubmitAssetPage = () => {
  const [energyAmount, setEnergyAmount] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const { connect, account, signAndSubmitTransaction, connected } = useWallet();

  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const CONTRACT_ADDRESS =
    "0x1ea5ad782b08a8e602920d13f5717c6715d0ea4f58e20babeac21e4af2dfb9b0";
  const aptos = new Aptos();

  useEffect(() => {
    if (connected) {
      setResult("Wallet connected successfully.");
    }
  }, [connected]);

  const handleConnect = async () => {
    try {
      await connect("Petra" as any);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleListEnergy = async () => {
    const transaction: InputTransactionData = {
      sender: account?.address,
      data: {
        function: `${CONTRACT_ADDRESS}::EnergyMarketplace::list_energy`,
        functionArguments: [
          energyAmount,
          pricePerUnit,
          Array.from(new TextEncoder().encode(description)),
        ],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setResult(
        `Energy listed successfully. Transaction hash: ${response.hash}`
      );
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-500">
        List Energy for Sale
      </h1>
      <div className="bg-gray-800 p-10 m-6 rounded-lg shadow-lg w-full max-w-3xl">
        {!connected ? (
          <div className="text-center mb-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg mb-4 text-center text-gray-300">
              Connected: {account?.address.toString()}
            </p>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Energy Amount:</label>
              <input
                type="number"
                value={energyAmount}
                onChange={(e) => setEnergyAmount(Number(e.target.value))}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Price per Unit:
              </label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div className="text-center">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
                onClick={handleListEnergy}
              >
                List Energy
              </button>
            </div>
          </>
        )}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-300">Result:</h2>
          <p className="text-gray-400">{result}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <SubmitAssetPage />
    </AptosWalletAdapterProvider>
  );
};

export default App;
