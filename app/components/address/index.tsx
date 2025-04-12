"use client";
import {useMemo, useState} from 'react';

export default function Address({address, chars = 5}: { address: string, chars?: number }) {
  const [copied, set] = useState(false);
  const addr = useMemo(() => {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }, [address, chars]);

  const copy = async () => {
    await navigator.clipboard.writeText(address);
    set(true);
    setTimeout(() => {
      set(false);
    }, 1000)
  }
  return (
      <span onClick={copy} className="relative cursor-copy">
        {addr}
        {copied && <span className="absolute bg-amber-100 z-10 -bottom-8 left-0 p-1 rounded-sm shadow-lg">
          Copied
        </span>}
      </span>
  );
}