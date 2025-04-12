"use client";
import ListContracts from '@/app/components/list-contracts';
import Navbar from '@/app/components/navbar';
import {useEffect} from 'react';
import {useStore} from '@/app/store';


export default function ContractsPage() {
  const contractsStore = useStore().getContracts;

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