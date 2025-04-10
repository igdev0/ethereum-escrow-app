import {PropsWithChildren} from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
      <div className="w-full min-h-full bg-amber-300">
        {props.children}
      </div>
  )
}