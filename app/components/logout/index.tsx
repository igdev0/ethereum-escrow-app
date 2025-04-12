"use client";
import {useAppStore} from '@/app/stores/app';
import Address from '@/app/components/address';

export default function Logout() {
  const {logout, address} = useAppStore();
  return (
      <div className="flex gap-2 items-center bg-white pl-4 shadow-md">
        {address && <Address address={address}/>}
        <button className="button" onClick={logout}>Logout</button>
      </div>
  );
}