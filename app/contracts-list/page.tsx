import ListContracts from '@/app/components/list-contracts';
import Navbar from '@/app/components/navbar';
import {getContracts} from '@/app/actions';
import {use} from 'react';

export default function ContractsPage() {
  const contracts = use(getContracts());

  return (
      <div className="container mx-auto">
        <Navbar/>
        <ListContracts contracts={contracts}/>
      </div>
  );
}