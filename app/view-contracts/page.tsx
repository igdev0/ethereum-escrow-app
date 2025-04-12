"use client";
import ListContracts, {ContractDataType} from '@/app/components/list-contracts';
import Navbar from '@/app/components/navbar';
import {getContracts} from '@/app/actions';
import {useCallback, useEffect, useState} from 'react';


export default function ContractsPage() {
  const [contracts, set] = useState<ContractDataType[]>([]);

  const onApprove = useCallback(async () => {
    set(await getContracts());
  }, []);

  useEffect(() => {
    getContracts().then(set);
  }, []);

  return (
      <div className="container mx-auto">
        <Navbar/>
        {
          !contracts ? <h1>Loading ...</h1> : <ListContracts contracts={contracts} onApprove={onApprove}/>
        }
      </div>
  );
}