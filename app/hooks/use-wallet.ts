"use client";
import {useState} from 'react';
import {JsonRpcSigner} from 'ethers';
import {useRouter} from 'next/navigation';
import useProvider from '@/app/hooks/use-provider';
import {useAppStore} from '@/app/stores/app';


export default function useWallet() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>();
  const [authenticated, setAuthenticated] = useState(false);
  const address = useAppStore().address;
  const provider = useProvider();
  const router = useRouter();


  const logout = async () => {
    await fetch("/api/auth/logout");
    setAuthenticated(false);
    router.push("/");
  };

  const disconnect = async () => {
    setSigner(null);
  };
  return {signer, address, authenticated, provider, disconnect, logout};
}