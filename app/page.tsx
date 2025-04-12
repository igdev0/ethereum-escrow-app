"use client";
import {redirect} from 'next/navigation';
import {useAppStore} from '@/app/stores/app';
import useProvider from '@/app/hooks/use-provider';

export default function Home() {
  const provider = useProvider();
  const {isAuthenticated, authenticate} = useAppStore();
  if (isAuthenticated) {
    redirect("/view-contracts");
  }
  return (
      <div className="flex justify-center items-center w-full min-h-full h-screen">
        <div className="flex justify-center flex-col gap-2 text-center">
          <h1 className="text-5xl font-bold">Welcome to the Escrow dApp</h1>
          <p>Connect your wallet so you can continue</p>
          <button className="button" onClick={() => provider && authenticate(provider)}>Connect</button>
        </div>
      </div>
  );
}
