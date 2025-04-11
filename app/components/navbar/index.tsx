import Logout from '@/app/components/logout';
import Link from 'next/link';

export default function Navbar() {
  return (
      <div className="flex justify-end gap-2 py-2">
        <Link href="/create" className="navlink">Create new escrow</Link>
        <Logout/>
      </div>
  )
}