"use client";
import ListContracts from '@/app/components/list-contracts';
import Navbar from '@/app/components/navbar';
import {useEffect} from 'react';
import {useContractsStore} from '@/app/stores/contracts';


export default function ContractsPage() {
  const contractsStore = useContractsStore().getContracts;

  useEffect(() => {
    contractsStore();
  }, [contractsStore]);

  return (
      <div className="container mx-auto">
        <Navbar/>
        {
          <ListContracts/>
        }
      </div>
  );
}