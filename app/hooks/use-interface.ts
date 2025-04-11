import {useMemo} from 'react';
import {abi} from "../generated/contracts/Escrow.sol/Escrow.json"
import {ethers} from 'ethers';
export default function useInterface() {
  return useMemo(() => {
      return new ethers.Interface(abi);
  }, [])
}