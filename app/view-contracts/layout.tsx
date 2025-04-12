import type {Metadata} from 'next';
import {PropsWithChildren} from 'react';

export const metadata: Metadata = {
  title: "Deploy escrow contract app",
  description: "A basic dApp that allows you to a smart deploy contract",
};

export default function Layout(props: PropsWithChildren) {
  return <>{props.children}</>
}