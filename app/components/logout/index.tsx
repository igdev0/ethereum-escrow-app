"use client";
import useWallet from '@/app/hooks/use-wallet';

export default function Logout() {
  const {logout} = useWallet();
  return (
      <button className="button" onClick={logout}>Logout</button>
  )
}