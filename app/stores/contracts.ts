import {create} from 'zustand/react';
import {getContracts, storeEscrowContract, StoreEscrowContractInput, updateContract} from '@/app/actions';

export interface ContractDataType {
  id: string;
  address: string | null;
  arbiter: string | null;
  beneficiary: string | null;
  depositor: string | null;
  value: bigint;
  isApproved: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Contracts {
  contracts: ContractDataType[],
  getContracts: () => Promise<void>,
  updateContract: (address: string, isApproved: boolean) => Promise<void>,
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
    async updateContract(address, isApproved) {
      await updateContract(address, isApproved);
      setState({
        contracts: getState().contracts.map(item => ({
          ...item,
          isApproved: item.address === address ? isApproved : item.isApproved
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


