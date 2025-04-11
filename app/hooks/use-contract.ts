import {abi} from "../generated/contracts/Escrow.sol/Escrow.json";
import {useMemo} from 'react';
import {ethers} from 'ethers';

export default function useContract(address: string) {
  return useMemo(() => {
    return new ethers.Contract(address, abi);
  }, [address]);
}