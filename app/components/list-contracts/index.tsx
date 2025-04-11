import {PropsWithChildren} from 'react';
import Address from '@/app/components/address';
import Approve from '@/app/components/approve';

interface ContractDataType {
  id: string
  address: string | null
  arbiter: string | null
  beneficiary: string | null
  depositor: string | null
  created_at: Date | null
  updated_at: Date | null
}

interface ListContractsProps extends PropsWithChildren {
  contracts: ContractDataType[];
}

export default async function ListContracts({contracts}: ListContractsProps) {

  const handleApprove = async () => {

  }
  return (
      <div>
        <h1 className="text-4xl font-bold my-5">Contracts</h1>
        <table className="bg-white shadow-2xl rounded-sm">
          <thead>
          <tr>
            <td className="font-bold p-2">Contract address</td>
            <td className="font-bold p-2">Beneficiary</td>
            <td className="font-bold p-2">Depositor</td>
            <td className="font-bold p-2">Arbiter</td>
          </tr>
          </thead>
          <tbody>
          {
            contracts.map(item => (
                <tr key={item.id}>
                  <td className="p-2">
                    <Address address={item.address as string}/>
                  </td>
                  <td className="p-2">
                    <Address address={item.beneficiary as string}/>
                  </td>
                  <td className="p-2">
                    <Address address={item.depositor as string}/>
                  </td>
                  <td className="p-2">
                    <Address address={item.arbiter as string}/>
                  </td>
                  <td className="p-2">
                    <Approve arbiter={item.arbiter as string}/>
                  </td>
                </tr>
            ))
          }
          </tbody>
        </table>
      </div>
  );
}