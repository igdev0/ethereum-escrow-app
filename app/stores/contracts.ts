import {create} from 'zustand/react';
import {
  approveEscrow,
  getContracts,
  storeEscrowContract,
  StoreEscrowContractInput,
} from '@/app/actions';

export interface ContractDataType {
  id: string;
  address: string | null;
  arbiter: string | null;
  beneficiary: string | null;
  depositor: string | null;
  value: string;
  isApproved: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Contracts {
  contracts: ContractDataType[],
  getContracts: () => Promise<void>,
  approveEscrow: (address: string) => Promise<void>,
  createContract: (input: StoreEscrowContractInput) => Promise<void>,
}

export const useContractsStore = create<Contracts>((setState, getState) => {
  return {
    contracts: [],
    async createContract(input) {
      const data = await storeEscrowContract(input);
      const contracts = getState().contracts;
      contracts.push(data);
      setState({
        contracts
      });
    },
    async approveEscrow(address) {
      await approveEscrow(address);
      setState({
        contracts: getState().contracts.map(item => ({
          ...item,
          isApproved: item.address === address ? true : item.isApproved
        }))
      });
    },
    async getContracts() {
      const data = await getContracts();
      setState({
        contracts: data
      });
    }
  };
});


