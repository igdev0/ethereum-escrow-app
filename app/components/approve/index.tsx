"use client";
import useContract from '@/app/hooks/use-contract';
import {useEffect} from 'react';
import {ethers} from 'ethers';
import {useContractsStore} from '@/app/stores/contracts';
import useProvider from '@/app/hooks/use-provider';
import {useAppStore} from '@/app/stores/app';

export default function Approve({arbiter, contractAddress, isApproved}: {
  arbiter: string,
  contractAddress: string,
  isApproved: boolean,
}) {
  const walletAddress = useAppStore().address;
  const provider = useProvider();
  const contract = useContract(contractAddress);
  const approveEscrow = useContractsStore().approveEscrow;

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
      await approveEscrow(contractAddress);
    });
  }, [provider, approveEscrow, contractAddress]);

  if (isApproved) {
    return <span>Approved ✅</span>;
  }

  if(walletAddress !== arbiter && !isApproved) {
    return <span>Pending approval ⏰</span>
  }

  return (
      <button className="button" onClick={handleApprove}>Approve</button>
  );
}