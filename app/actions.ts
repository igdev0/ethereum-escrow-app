"use server";
import db from '@/app/db';
import {cookies} from 'next/headers';

export interface StoreEscrowContractInput {
  beneficiary: string,
  address: string,
  depositor: string,
  arbiter: string,
  value: string,
  isApproved: boolean,
  isMinted: boolean,
}

export async function storeEscrowContract(input: StoreEscrowContractInput) {
  return db.contracts.create({
    data: {
      address: input.address.toLowerCase(),
      beneficiary: input.beneficiary.toLowerCase(),
      depositor: input.depositor.toLowerCase(),
      arbiter: input.arbiter.toLowerCase(),
      isApproved: input.isApproved,
      value: input.value,
    }
  });
}

export async function approveEscrow(address:string) {
  return db.contracts.update({
    where: {
      address
    },
    data: {
      isApproved: true
    }
  })
}

export async function getContracts() {
  const reqCookies = await cookies();
  const data = reqCookies.get("session");
  const address = data?.value;
  return db.contracts.findMany({
    where: {
      OR: [
        {
          beneficiary: {
            equals: address,
          },
        },
        {
          depositor: {
            equals: address
          },
        },
        {
          arbiter: {
            equals: address
          }
        }
      ]
    }
  });
}