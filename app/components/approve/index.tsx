"use client";
import useWallet from '@/app/hooks/use-wallet';
import {useCallback} from 'react';

export default function Approve({arbiter}: {arbiter: string}) {
  const wallet = useWallet();

  const handleApprove = useCallback(() => {

  }, [])

  if(wallet.address !== arbiter) {
    return null;
  }

  return (
      <button className="button" onClick={handleApprove}>Approve</button>
  )
}