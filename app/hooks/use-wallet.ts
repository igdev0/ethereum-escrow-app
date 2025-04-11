"use client";
import {useEffect, useState} from 'react';
import {BrowserProvider, ethers, JsonRpcSigner} from 'ethers';
import {useRouter} from 'next/navigation';


export default function useWallet() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>();
  const [authenticated, setAuthenticated] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const router = useRouter();

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    (async () => {
      provider._start();
    })()
  }, []);

  const authenticate = async () => {
    const accounts = await provider?.send("eth_requestAccounts",[]);
    const address = accounts[0];
    const nonce = Math.random() * Math.pow(10, 81);
    const message = `Signing in with account nonce: ${nonce}`;
    const msg =  `0x${Buffer.from(message, "utf8").toString("hex")}`;
    const signature: string = await provider?.send("personal_sign", [msg, address]);

    const response = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({
        signature,
        message,
        address,
        nonce
      })
    })


    const data = await response.json();
    setAuthenticated(data.authenticated);
    setAddress(address);
  };

  const logout = async () => {
    await fetch("/api/auth/logout");
    setAuthenticated(false);
    await router.push("/");
  }

  const getUser = async () => {
    const response = await fetch("/api/auth/user");
    const data = await response.json();
    setAuthenticated(data.authenticated);
  }

  useEffect(() => {
    getUser();
  }, []);

  const disconnect = async () => {
    setSigner(null);
  };
  return {signer, address, authenticated, provider, disconnect, authenticate, logout};
}