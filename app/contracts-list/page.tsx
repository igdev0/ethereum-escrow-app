import ListContracts from '@/app/components/list-contracts';
import Logout from '@/app/components/logout';

export default function ContractsPage() {
  return (
      <div className="block">
        <Logout/>
        <ListContracts/>
      </div>
  )
}