"use client";
import useWallet from '@/app/hooks/use-wallet';
import {redirect} from 'next/navigation';

export default function Home() {
  const {authenticate, authenticated} = useWallet();
  if (authenticated) {
    redirect("/view-contracts");
  }
  return (
      <div className="flex justify-center items-center w-full min-h-full h-screen">
        <div className="flex justify-center flex-col gap-2 text-center">
          <h1 className="text-5xl font-bold">Welcome to the Escrow dApp</h1>
          <p>Connect your wallet so you can continue</p>
          <button className="button" onClick={authenticate}>Connect</button>
        </div>
      </div>
  );
}
