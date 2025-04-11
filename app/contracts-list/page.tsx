import ListContracts from '@/app/components/list-contracts';
import Navbar from '@/app/components/navbar';

export default function ContractsPage() {
  return (
      <div className="container mx-auto">
        <Navbar/>
        <ListContracts/>
      </div>
  );
}