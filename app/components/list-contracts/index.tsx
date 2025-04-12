import {PropsWithChildren} from 'react';
import Address from '@/app/components/address';
import Approve from '@/app/components/approve';
import Link from 'next/link';

interface ContractDataType {
  id: string;
  address: string | null;
  arbiter: string | null;
  beneficiary: string | null;
  depositor: string | null;
  isApproved: boolean;
  isDeployed: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

interface ListContractsProps extends PropsWithChildren {
  contracts: ContractDataType[];
}

export default async function ListContracts({contracts}: ListContractsProps) {

  return (
      <div>
        <h1 className="text-4xl font-bold my-5">Contracts</h1>
        {
          contracts.length ? (

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
                            <Approve contractAddress={item.address as string} arbiter={item.arbiter as string}
                                     isApproved={item.isApproved}/>
                          </td>
                        </tr>
                    ))
                  }
                  </tbody>
                </table>
          ) : <h1>No contracts found 😮 <Link className="text-amber-500 font-bold" href="/create-escrow">Create one</Link></h1>
        }
      </div>
  );
}