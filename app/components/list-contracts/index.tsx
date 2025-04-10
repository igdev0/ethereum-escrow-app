import db from '@/app/db';

export default async function ListContracts() {
  const contracts = await db.contracts.findMany();
  return (
      <div className="flex">
        <h1>Contracts</h1>
        {
          contracts.map(item => item.address)
        }
      </div>
  )
}