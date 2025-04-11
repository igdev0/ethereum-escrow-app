import ListContracts from '@/app/components/list-contracts';
import Logout from '@/app/components/logout';

export default function ContractsPage() {
  return (
      <div className="container mx-auto">
        <Logout/>
        <ListContracts/>
      </div>
  )
}