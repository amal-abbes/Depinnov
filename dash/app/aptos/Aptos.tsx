"use client";
import React, { useState, useEffect } from "react";
import { AptosClient } from "aptos";
import { Account, Aptos } from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

declare global {
  interface Window {
    aptos: any;
  }
}

const HomePage = () => {
  const [recipient, setRecipient] = useState("");
  const wallets = [new PetraWallet()];
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const { connect, account, signAndSubmitTransaction, connected, wallet } = useWallet();

  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const CONTRACT_ADDRESS = "0x1ea5ad782b08a8e602920d13f5717c6715d0ea4f58e20babeac21e4af2dfb9b0";
  const aptos = new Aptos();

  const admin = Account.generate();

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

  const handleMint = async () => {
    const transaction: InputTransactionData = {
      sender: account?.address,
      data: {
        function: `${CONTRACT_ADDRESS}::dov_token::transfer`,
        functionArguments: [account?.address, recipient, amount],
      },
    };

    const response = await signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
  };

  const handleTransfer = async () => {
    const transaction: InputTransactionData = {
      sender: admin?.accountAddress,
      data: {
        function: `${CONTRACT_ADDRESS}::dov_token::transfer`,
        functionArguments: [account?.address, recipient, amount],
      },
    };

    const response = await signAndSubmitTransaction(transaction);
    await client.waitForTransaction(response.hash);

    return response;
  };

  const handleBurn = async () => {
    const transaction: InputTransactionData = {
      sender: admin?.accountAddress,
      data: {
        function: `${CONTRACT_ADDRESS}::dov_token::burn`,
        functionArguments: [recipient, amount],
      },
    };

    const response = await signAndSubmitTransaction(transaction);
    await client.waitForTransaction(response.hash);

    return response;
  };

  const handleFreeze = async () => {
    const transaction: InputTransactionData = {
      sender: admin?.accountAddress,
      data: {
        function: `${CONTRACT_ADDRESS}::dov_token::freeze_account`,
        functionArguments: [recipient],
      },
    };

    const response = await signAndSubmitTransaction(transaction);
    await client.waitForTransaction(response.hash);
    return response;
  };

  const handleUnfreeze = async () => {
    const transaction: InputTransactionData = {
      sender: admin?.accountAddress,
      data: {
        function: `${CONTRACT_ADDRESS}::dov_token::unfreeze_account`,
        functionArguments: [account?.address],
      },
    };

    const response = await signAndSubmitTransaction(transaction);
    await client.waitForTransaction(response.hash);
    return response;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 m-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-500">
          DovCoin Smart Contract Interaction
        </h1>
        {!connected ? (
          <button
            onClick={handleConnect}
            className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="mb-6 text-gray-300">
              Connected: {account?.address.toString()}
            </p>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="recipient">
                Recipient Address:
              </label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient address"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="amount">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-4">
              <button
                onClick={handleMint}
                className="w-full bg-green-600 text-white py-3 px-5 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Mint
              </button>
              <button
                onClick={handleTransfer}
                className="w-full bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Transfer
              </button>
              <button
                onClick={handleBurn}
                className="w-full bg-red-600 text-white py-3 px-5 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Burn
              </button>
              <button
                onClick={handleFreeze}
                className="w-full bg-yellow-600 text-white py-3 px-5 rounded-lg hover:bg-yellow-700 transition duration-300"
              >
                Freeze
              </button>
              <button
                onClick={handleUnfreeze}
                className="w-full bg-purple-600 text-white py-3 px-5 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Unfreeze
              </button>
            </div>
          </>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-300">Result:</h2>
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
      <HomePage />
    </AptosWalletAdapterProvider>
  );
};

export default App;
