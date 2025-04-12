"use client";
import useWallet from '@/app/hooks/use-wallet';
import useContract from '@/app/hooks/use-contract';
import {useEffect} from 'react';
import {ethers} from 'ethers';
import {updateContract} from '@/app/actions';
import useInterface from '@/app/hooks/use-interface';

export default function Approve({arbiter, contractAddress, isApproved, onApprove}: {
  arbiter: string,
  contractAddress: string,
  isApproved: boolean,
  onApprove: () => void
}) {
  const wallet = useWallet();
  const iface = useInterface();
  const {provider} = useWallet();
  const contract = useContract(contractAddress);

  const handleApprove = async () => {
    const signer = await provider?.getSigner();
    if (signer) {
      const contractFactory = contract.connect(signer);
      const fn = contractFactory.getFunction("approve");
      await fn();
    }
  };

  useEffect(() => {
    provider?.on({address: contractAddress, topics: [ethers.id("Approved(uint256)")]}, async (log) => {
      await updateContract(contractAddress, true);
      onApprove();
    });
  }, [provider, onApprove, contract, iface, contractAddress]);

  if (wallet.address !== arbiter || isApproved) {
    return <span>Approved ✅</span>;
  }

  return (
      <button className="button" onClick={handleApprove}>Approve</button>
  );
}