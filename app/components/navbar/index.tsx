"use client";
import Logout from '@/app/components/logout';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
      <div className="flex justify-end gap-2 py-2">
        <Link href="/view-contracts" draggable={false} className={`navlink ${pathname === '/view-contracts' ? 'border-b-4 border-b-amber-500' : ""}`}>View contracts</Link>
        <Link href="/create-escrow" draggable={false} className={`navlink ${pathname === '/create-escrow' ? 'border-b-4 border-b-amber-500' : ""}`}>Create new escrow</Link>
        <Logout/>
      </div>
  )
}