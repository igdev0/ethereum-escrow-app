import type {Metadata} from 'next';
import {PropsWithChildren} from 'react';

export const metadata: Metadata = {
  title: "Deploy new escrow",
  description: "A basic dApp that allows you to a smart deploy contract",
};

export default function Layout(props: PropsWithChildren) {
  return <>{props.children}</>
}