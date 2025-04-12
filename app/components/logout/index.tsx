"use client";
import {useAppStore} from '@/app/stores/app';

export default function Logout() {
  const {logout} = useAppStore();
  return (
      <button className="button" onClick={logout}>Logout</button>
  );
}