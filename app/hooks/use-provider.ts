"use client";
import {useLayoutEffect, useState} from 'react';
import {BrowserProvider, ethers} from 'ethers';

export default function useProvider() {
  const [provider, set] = useState<BrowserProvider>();
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    set(new ethers.BrowserProvider(window.ethereum));
  }, []);
  return provider;
}