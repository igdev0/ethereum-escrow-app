import {useMemo} from 'react';


export default function Address({address, chars = 5}: { address: string, chars?: number }) {
  const addr = useMemo(() => {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }, [address, chars]);
  return (
      <span>
        {addr}
      </span>
  );
}