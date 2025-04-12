import {create} from 'zustand/react';
import {BrowserProvider} from 'ethers';
import {useEffect} from 'react';
import {router} from 'next/client';

interface AppStore {
  address: string | null,
  isAuthenticated: boolean,
  initialized: boolean,
  authenticate: (provider: BrowserProvider) => Promise<void>,
  logout: () => Promise<void>,
  init: () => Promise<void>
}

const useCreateAppStore = create<AppStore>((setState) => {
  return {
    initialized: false,
    address: null,
    isAuthenticated: false,
    async authenticate(provider) {
      const accounts = await provider?.send("eth_requestAccounts", []);
      const address = accounts[0];
      const nonce = Math.random() * Math.pow(10, 81);
      const message = `Signing in with account nonce: ${nonce}`;
      const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
      const signature: string = await provider?.send("personal_sign", [msg, address]);

      const response = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({
          signature,
          message,
          address,
          nonce
        })
      });

      const data = await response.json();
      setState({
        address: address,
        isAuthenticated: data.authenticated,
      });
    },
    async init() {
      const response = await fetch("/api/auth/user");
      const data: { authenticated: boolean, address: string } = await response.json();
      setState({
        address: data.address,
        isAuthenticated: data.authenticated,
        initialized: true,
      });
    },
    async logout() {
      await fetch("/api/auth/logout");
      setState({
        isAuthenticated: false,
      });
      await router.push(new URL("/"));
    }
  };
});

export const useAppStore = () => {
  const zustandStore = useCreateAppStore();

  useEffect(() => {
    (async () => {
      if (!zustandStore.initialized) {
        await zustandStore.init();
      }
    })();
  }, [zustandStore]);

  return zustandStore;
};